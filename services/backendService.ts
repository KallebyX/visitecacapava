import type { User, Route, PointOfInterest, Badge, HotelCheckIn, OpinionScale, Challenge, Photo } from '../types';
import { USERS, ROUTES, POINTS_OF_INTEREST, BADGES, HOTEL_CHECKINS, CHALLENGES, PHOTOS } from '../constants';

// --- MOCK DATABASE with Session Storage Persistence ---
// This creates a fully interactive mock backend that persists for the user's session.

const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = sessionStorage.getItem(key);
        if (item) {
            const parsed = JSON.parse(item);
            // If the stored value is null (e.g., from a previous error or empty state),
            // fall back to the default value to prevent crashes.
            return parsed !== null ? parsed : defaultValue;
        }
        return defaultValue;
    } catch (error) {
        console.error(`Error reading from sessionStorage key "${key}":`, error);
        // If parsing fails, also fall back to default.
        return defaultValue;
    }
};

const saveToStorage = <T>(key: string, value: T) => {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing to sessionStorage key "${key}":`, error);
    }
};

class MockDB {
    users: User[];
    routes: Route[];
    pois: PointOfInterest[];
    badges: Badge[];
    checkIns: HotelCheckIn[];
    challenges: Challenge[];
    photos: Photo[];

    constructor() {
        this.users = getFromStorage('db_users', USERS);
        this.routes = getFromStorage('db_routes', ROUTES);
        this.pois = getFromStorage('db_pois', POINTS_OF_INTEREST);
        this.badges = getFromStorage('db_badges', BADGES);
        this.checkIns = getFromStorage('db_checkins', HOTEL_CHECKINS);
        this.challenges = getFromStorage('db_challenges', CHALLENGES);
        this.photos = getFromStorage('db_photos', PHOTOS);
    }

    save() {
        saveToStorage('db_users', this.users);
        saveToStorage('db_routes', this.routes);
        saveToStorage('db_pois', this.pois);
        saveToStorage('db_badges', this.badges);
        saveToStorage('db_checkins', this.checkIns);
        saveToStorage('db_challenges', this.challenges);
        saveToStorage('db_photos', this.photos);
    }
}

let db = new MockDB();

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


export const backendService = {
  // --- AUTH ---
  async login(email: string, password: string): Promise<User | null> {
    await delay(300);
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
  },

  // --- USERS ---
  async getUserById(userId: string): Promise<User | null> {
    await delay(50);
    const user = db.users.find(u => u.id === userId);
    return user ? { ...user } : null;
  },
  
  async getLeaderboard(): Promise<User[]> {
      await delay(200);
      return [...db.users]
        .filter(u => u.role === 'tourist')
        .sort((a, b) => b.points - a.points);
  },

  async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
      await delay(150);
      const userIndex = db.users.findIndex(u => u.id === userId);
      if (userIndex > -1) {
          db.users[userIndex] = { ...db.users[userIndex], ...data };
          db.save();
          return { ...db.users[userIndex] };
      }
      return null;
  },

  // --- ROUTES ---
  async getRoutes(): Promise<Route[]> {
    await delay(100);
    return [...db.routes];
  },

  async getRouteById(routeId: string): Promise<Route | null> {
    await delay(50);
    const route = db.routes.find(r => r.id === routeId);
    return route ? { ...route } : null;
  },

  async createRoute(routeData: Omit<Route, 'id'>): Promise<Route> {
    await delay(200);
    const newRoute: Route = {
        id: `route-${Date.now()}`,
        ...routeData
    };
    db.routes.push(newRoute);
    db.save();
    return newRoute;
  },

  async updateRoute(routeId: string, routeData: Partial<Route>): Promise<Route | null> {
    await delay(200);
    const routeIndex = db.routes.findIndex(r => r.id === routeId);
    if (routeIndex > -1) {
        db.routes[routeIndex] = { ...db.routes[routeIndex], ...routeData };
        db.save();
        return { ...db.routes[routeIndex] };
    }
    return null;
  },

  async deleteRoute(routeId: string): Promise<boolean> {
     await delay(300);
     db.routes = db.routes.filter(r => r.id !== routeId);
     db.save();
     return true;
  },

  // --- POINTS OF INTEREST ---
  async getPointsOfInterest(): Promise<PointOfInterest[]> {
    await delay(100);
    return [...db.pois];
  },

  async getPointOfInterestById(poiId: string): Promise<PointOfInterest | null> {
    await delay(50);
    const poi = db.pois.find(p => p.id === poiId);
    return poi ? { ...poi } : null;
  },

  async createPointOfInterest(poiData: Omit<PointOfInterest, 'id'>): Promise<PointOfInterest> {
     await delay(200);
     const newPoi: PointOfInterest = { id: `poi-${Date.now()}`, ...poiData };
     db.pois.push(newPoi);
     db.save();
     return newPoi;
  },

  async updatePointOfInterest(poiId: string, poiData: Partial<PointOfInterest>): Promise<PointOfInterest | null> {
     await delay(200);
     const poiIndex = db.pois.findIndex(p => p.id === poiId);
     if (poiIndex > -1) {
        db.pois[poiIndex] = { ...db.pois[poiIndex], ...poiData };
        db.save();
        return { ...db.pois[poiIndex] };
     }
     return null;
  },
  
  async deletePointOfInterest(poiId: string): Promise<boolean> {
     await delay(300);
     db.pois = db.pois.filter(p => p.id !== poiId);
     // Also remove from any routes
     db.routes.forEach(route => {
        route.pointsOfInterest = route.pointsOfInterest.filter(id => id !== poiId);
     });
     db.save();
     return true;
  },
  
  // --- GAMIFICATION ---
  async checkIn(userId: string, pointId: string): Promise<{ success: boolean; message: string; newBadges: Badge[] }> {
    await delay(500);
    const userIndex = db.users.findIndex(u => u.id === userId);
    const poi = db.pois.find(p => p.id === pointId);

    if (userIndex === -1 || !poi) {
        return { success: false, message: 'Usuário ou Ponto de Interesse não encontrado.', newBadges: [] };
    }
    
    const user = db.users[userIndex];
    if (user.visited.some(v => v.pointId === pointId)) {
        return { success: false, message: 'Você já fez check-in neste local.', newBadges: [] };
    }
    
    // Update user data
    user.visited.push({ pointId, date: new Date().toISOString() });
    user.points += poi.points;

    // Check for new badges
    const newBadges: Badge[] = [];
    const visitedIds = new Set(user.visited.map(v => v.pointId));
    const allPoiIds = new Set(db.pois.map(p => p.id));

    db.badges.forEach(badge => {
        if (!user.badges.includes(badge.id) && badge.criteria(visitedIds, allPoiIds)) {
            user.badges.push(badge.id);
            newBadges.push(badge);
        }
    });

    db.save();
    
    let message = `Check-in realizado! Você ganhou ${poi.points} pontos.`;
    if (newBadges.length > 0) {
        message += ` E ${newBadges.length} nova(s) conquista(s)!`;
    }

    return { success: true, message, newBadges };
  },

  async getBadgesForUser(userId: string): Promise<Badge[]> {
      await delay(100);
      const user = db.users.find(u => u.id === userId);
      if (!user) return [];
      return db.badges.filter(b => user.badges.includes(b.id));
  },
  
  async getAllBadges(): Promise<Badge[]> {
      await delay(50);
      return [...db.badges];
  },

  // --- CHALLENGES & EVENTS ---
  async getChallenges(): Promise<Challenge[]> {
    await delay(100);
    return [...db.challenges];
  },

  async createChallenge(challengeData: Omit<Challenge, 'id'>): Promise<Challenge> {
    await delay(200);
    const newChallenge: Challenge = { id: `challenge-${Date.now()}`, ...challengeData };
    db.challenges.push(newChallenge);
    db.save();
    return newChallenge;
  },

  async updateChallenge(challengeId: string, challengeData: Partial<Challenge>): Promise<Challenge | null> {
    await delay(200);
    const index = db.challenges.findIndex(c => c.id === challengeId);
    if (index > -1) {
        db.challenges[index] = { ...db.challenges[index], ...challengeData };
        db.save();
        return { ...db.challenges[index] };
    }
    return null;
  },

  async deleteChallenge(challengeId: string): Promise<boolean> {
    await delay(300);
    db.challenges = db.challenges.filter(c => c.id !== challengeId);
    db.save();
    return true;
  },

  // --- PHOTO GALLERY ---
  async getPhotos(): Promise<Photo[]> {
    await delay(150);
    return [...db.photos].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async createPhoto(photoData: Omit<Photo, 'id' | 'timestamp' | 'likes' | 'userName' | 'userAvatarUrl'>): Promise<Photo> {
    await delay(300);
    const user = await this.getUserById(photoData.userId);
    if (!user) throw new Error("User not found");

    const newPhoto: Photo = {
        id: `photo-${Date.now()}`,
        ...photoData,
        userName: user.name,
        userAvatarUrl: user.avatarUrl,
        timestamp: new Date().toISOString(),
        likes: [],
    };
    db.photos.push(newPhoto);
    
    // Award points for posting a photo
    await this.updateUser(photoData.userId, { points: user.points + 15 }); // +15 points for a new photo

    db.save();
    return newPhoto;
  },

  async likePhoto(photoId: string, likingUserId: string): Promise<Photo | null> {
    await delay(100);
    const photoIndex = db.photos.findIndex(p => p.id === photoId);
    if (photoIndex === -1) return null;

    const photo = db.photos[photoIndex];
    const photoOwner = await this.getUserById(photo.userId);
    if (!photoOwner) return null;

    // Prevent liking own photo or liking twice
    if (photo.userId === likingUserId || photo.likes.includes(likingUserId)) {
        return photo;
    }

    photo.likes.push(likingUserId);
    
    // Award points to the photo owner for receiving a like
    await this.updateUser(photo.userId, { points: photoOwner.points + 2 }); // +2 points per like

    db.save();
    return { ...photo };
  },

  // --- HOTEL ---
  async getHotelCheckIns(hotelId: string): Promise<HotelCheckIn[]> {
    await delay(150);
    return db.checkIns.filter(c => c.hotelId === hotelId);
  },

  async createHotelCheckIn(hotelId: string, checkInData: Omit<HotelCheckIn, 'id' | 'hotelId'>): Promise<HotelCheckIn> {
    await delay(300);
    const newCheckIn: HotelCheckIn = {
        id: `checkin-${Date.now()}`,
        hotelId,
        ...checkInData
    };
    db.checkIns.push(newCheckIn);
    db.save();
    return newCheckIn;
  },

  // --- ADMIN DASHBOARD ---
  async getAdminStats(): Promise<any> {
    await delay(200);
    const totalCheckIns = db.users.reduce((sum, u) => sum + u.visited.length, 0);
    const allVisits: { [key: string]: number } = {};
    db.users.forEach(u => {
        u.visited.forEach(v => {
            allVisits[v.pointId] = (allVisits[v.pointId] || 0) + 1;
        });
    });
    const mostVisitedEntry = Object.entries(allVisits).sort((a,b) => b[1] - a[1])[0];
    const mostVisitedPoiId = mostVisitedEntry ? mostVisitedEntry[0] : null;
    const mostVisitedPoi = mostVisitedPoiId ? db.pois.find(p => p.id === mostVisitedPoiId)?.name : 'Nenhum';

    return {
        totalTourists: db.users.filter(u => u.role === 'tourist').length,
        totalRoutes: db.routes.length,
        totalCheckIns,
        mostVisitedPoi
    };
  },
  
  async getAnalyticsSummary(): Promise<any> {
    await delay(150);
    
    if (db.checkIns.length === 0) {
      return {
        totalVisitors: 0,
        avgCityRating: 'N/A',
        mostPopularRoute: 'N/A'
      };
    }

    const uniqueVisitors = new Set(db.checkIns.map(c => c.touristName)).size;
    
    const ratingMap: Record<OpinionScale, number> = {
      'Péssimo': 1,
      'Ruim': 2,
      'Boa': 3,
      'Muito boa': 4,
      'Ótima': 5
    };

    const totalRating = db.checkIns.reduce((sum, c) => sum + (ratingMap[c.cityOpinion] || 3), 0);
    const avgCityRating = (totalRating / db.checkIns.length).toFixed(1);

    // This is already calculated in getAnalyticsData, so just reuse the logic
    const completionsByRoute: { [key: string]: number } = { 'Belezas Naturais': 1, 'Riqueza Histórica': 0, 'Sabores da Terra': 0 }; // Mock data
    const mostPopularRoute = Object.entries(completionsByRoute).sort((a,b) => b[1] - a[1])[0][0] || 'N/A';
    
    return {
      totalVisitors: uniqueVisitors,
      avgCityRating,
      mostPopularRoute
    };
  },

  async getAnalyticsData(): Promise<any> {
    await delay(400);
    // Generate analytics from mock check-in data
    const analytics = {
      demographics: { byGender: {}, ageRanges: {}, byNationality: {} },
      travelBehavior: { byReason: {}, byTransport: {}, byDiscovery: {} },
      satisfaction: { poi: {}, city: {} },
      routeAnalytics: { completionsByRoute: { 'Belezas Naturais': 1, 'Riqueza Histórica': 0, 'Sabores da Terra': 0 }, mostPopularRoute: 'Belezas Naturais' }
    };
    
    const count = (obj: any, key: string) => { obj[key] = (obj[key] || 0) + 1; };

    db.checkIns.forEach(c => {
        count(analytics.demographics.byGender, c.gender);
        count(analytics.demographics.byNationality, c.nationality);
        
        const age = new Date().getFullYear() - new Date(c.birthDate).getFullYear();
        if (age < 20) count(analytics.demographics.ageRanges, '0-19');
        else if (age < 30) count(analytics.demographics.ageRanges, '20-29');
        else if (age < 40) count(analytics.demographics.ageRanges, '30-39');
        else if (age < 50) count(analytics.demographics.ageRanges, '40-49');
        else count(analytics.demographics.ageRanges, '50+');

        count(analytics.travelBehavior.byReason, c.travelReason);
        count(analytics.travelBehavior.byTransport, c.transportMean);
        count(analytics.travelBehavior.byDiscovery, c.discoveryChannel);

        count(analytics.satisfaction.poi, c.poiOpinion);
        count(analytics.satisfaction.city, c.cityOpinion);
    });

    return analytics;
  },

  async getFullAdminDashboardData(): Promise<any> {
    await delay(450);
    const stats = await this.getAdminStats();
    const analytics = await this.getAnalyticsData();

    // Add bot usage mock data
    const botUsage = {
        totalInteractions: 1245,
        commonQuestions: [
            { question: "Horários da Cascata", count: 230 },
            { question: "Onde comer?", count: 180 },
            { question: "Roteiro de 1 dia", count: 150 },
        ],
        satisfaction: "92%",
    };
    
    const totalHotelCheckIns = db.checkIns.length;

    return {
        ...stats,
        analytics,
        totalHotelCheckIns,
        botUsage,
    };
  },

  // --- ADMIN: TOURIST MANAGEMENT ---
  async getAllTouristsData(): Promise<any[]> {
    await delay(200);
    const tourists = db.users.filter(u => u.role === 'tourist');
    const checkInsByTouristName = db.checkIns.reduce((acc, ci) => {
        acc[ci.touristName.toLowerCase()] = ci;
        return acc;
    }, {} as Record<string, HotelCheckIn>);

    return tourists.map(t => {
        const checkInInfo = checkInsByTouristName[t.name.toLowerCase()];
        return {
            id: t.id,
            name: t.name,
            email: t.email,
            points: t.points,
            phone: checkInInfo ? checkInInfo.phone : 'N/A',
        };
    });
  }

};