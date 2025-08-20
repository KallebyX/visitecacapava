import type { User, Route, PointOfInterest, Badge, HotelCheckIn, OpinionScale, Challenge, Photo, Favorite, Review, GalleryLike } from '../types';
import { USERS, ROUTES, POINTS_OF_INTEREST, BADGES, HOTEL_CHECKINS, CHALLENGES, PHOTOS, REVIEWS, FAVORITES } from '../constants';

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
    favorites: Favorite[];
    reviews: Review[];
    galleryLikes: GalleryLike[];

    constructor() {
        this.users = getFromStorage('db_users', USERS);
        this.routes = getFromStorage('db_routes', ROUTES);
        this.pois = getFromStorage('db_pois', POINTS_OF_INTEREST);
        this.badges = getFromStorage('db_badges', BADGES);
        this.checkIns = getFromStorage('db_checkins', HOTEL_CHECKINS);
        this.challenges = getFromStorage('db_challenges', CHALLENGES);
        this.photos = getFromStorage('db_photos', PHOTOS);
        this.favorites = getFromStorage('db_favorites', FAVORITES);
        this.reviews = getFromStorage('db_reviews', REVIEWS);
        this.galleryLikes = getFromStorage('db_gallery_likes', []);
    }

    save() {
        saveToStorage('db_users', this.users);
        saveToStorage('db_routes', this.routes);
        saveToStorage('db_pois', this.pois);
        saveToStorage('db_badges', this.badges);
        saveToStorage('db_checkins', this.checkIns);
        saveToStorage('db_challenges', this.challenges);
        saveToStorage('db_photos', this.photos);
        saveToStorage('db_favorites', this.favorites);
        saveToStorage('db_reviews', this.reviews);
        saveToStorage('db_gallery_likes', this.galleryLikes);
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

  // --- HOTEL DASHBOARD ---
  async getHotelDashboardData(hotelId: string): Promise<any> {
    await delay(300);
    const hotelCheckIns = db.checkIns.filter(c => c.hotelId === hotelId);
    if (hotelCheckIns.length === 0) {
      return {
        totalGuests: 0,
        satisfaction: { city: {}, poi: {} },
        demographics: { byOrigin: {} },
        travelBehavior: { byReason: {} },
        recentCheckIns: [],
      };
    }

    const satisfaction = { city: {}, poi: {} };
    const demographics = { byOrigin: {} };
    const travelBehavior = { byReason: {} };

    const count = (obj: any, key: string) => { obj[key] = (obj[key] || 0) + 1; };

    hotelCheckIns.forEach(c => {
      count(satisfaction.city, c.cityOpinion);
      count(satisfaction.poi, c.poiOpinion);
      count(demographics.byOrigin, c.originCity);
      count(travelBehavior.byReason, c.travelReason);
    });

    return {
      totalGuests: hotelCheckIns.length,
      satisfaction,
      demographics,
      travelBehavior,
      recentCheckIns: hotelCheckIns.slice(0, 5).sort((a, b) => new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime()),
    };
  },

  // --- ADMIN: HOTEL ANALYTICS ---
  async getAllHotelsAnalytics(): Promise<any> {
    await delay(400);
    const hotels = db.users.filter(u => u.role === 'hotel');
    const analyticsByHotel = hotels.map(hotel => {
        const hotelCheckIns = db.checkIns.filter(c => c.hotelId === hotel.id);
        const totalGuests = hotelCheckIns.length;
        
        const ratingMap: Record<OpinionScale, number> = { 'Péssimo': 1, 'Ruim': 2, 'Boa': 3, 'Muito boa': 4, 'Ótima': 5 };
        const totalRating = hotelCheckIns.reduce((sum, c) => sum + (ratingMap[c.cityOpinion] || 3), 0);
        const avgRating = totalGuests > 0 ? (totalRating / totalGuests).toFixed(1) : 'N/A';

        return {
            hotelId: hotel.id,
            hotelName: hotel.name,
            totalGuests,
            avgRating,
        };
    });

    return {
        summary: analyticsByHotel,
        allCheckIns: [...db.checkIns], // For detailed filtering on the frontend
    };
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
  },

  // --- FAVORITES SYSTEM ---
  async toggleFavorite(userId: string, entityType: 'restaurant' | 'poi' | 'hotel', entityId: string): Promise<{ favorited: boolean }> {
    await delay(200);
    
    const existingFavoriteIndex = db.favorites.findIndex(f => 
      f.userId === userId && f.entityType === entityType && f.entityId === entityId
    );

    if (existingFavoriteIndex > -1) {
      // Remove favorite
      db.favorites.splice(existingFavoriteIndex, 1);
      db.save();
      return { favorited: false };
    } else {
      // Add favorite
      const newFavorite: Favorite = {
        id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        entityType,
        entityId,
        createdAt: new Date().toISOString()
      };
      db.favorites.push(newFavorite);
      db.save();
      return { favorited: true };
    }
  },

  async getUserFavorites(userId: string, entityType?: 'restaurant' | 'poi' | 'hotel'): Promise<Favorite[]> {
    await delay(100);
    return db.favorites.filter(f => 
      f.userId === userId && (!entityType || f.entityType === entityType)
    );
  },

  // --- REVIEWS SYSTEM ---
  async getReviews(entityType: 'restaurant' | 'poi' | 'hotel', entityId: string, limit: number = 10, offset: number = 0): Promise<{ items: Review[]; total: number }> {
    await delay(150);
    
    const entityReviews = db.reviews.filter(r => 
      r.entityType === entityType && r.entityId === entityId
    );

    // Join with user data
    const reviewsWithUser = entityReviews.map(review => {
      const user = db.users.find(u => u.id === review.userId);
      return {
        ...review,
        user: user ? {
          name: user.name,
          avatarUrl: user.avatarUrl
        } : undefined
      };
    });

    // Sort by most recent first
    reviewsWithUser.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const paginatedReviews = reviewsWithUser.slice(offset, offset + limit);

    return {
      items: paginatedReviews,
      total: reviewsWithUser.length
    };
  },

  async createReview(userId: string, entityType: 'restaurant' | 'poi' | 'hotel', entityId: string, rating: number, comment: string): Promise<Review> {
    await delay(200);
    
    // Check if user already reviewed this entity
    const existingReview = db.reviews.find(r => 
      r.userId === userId && r.entityType === entityType && r.entityId === entityId
    );

    if (existingReview) {
      throw new Error('Usuário já avaliou este estabelecimento');
    }

    const newReview: Review = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      entityType,
      entityId,
      rating: Math.max(1, Math.min(5, rating)), // Ensure rating is between 1-5
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
      verified: Math.random() > 0.3 // 70% chance of being verified
    };

    db.reviews.push(newReview);
    
    // Award points to user for reviewing
    const user = db.users.find(u => u.id === userId);
    if (user) {
      await this.updateUser(userId, { points: user.points + 10 }); // +10 points per review
    }

    db.save();
    return newReview;
  },

  async updateReviewResponse(reviewId: string, response: string): Promise<Review | null> {
    await delay(150);
    
    const reviewIndex = db.reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
      db.reviews[reviewIndex].response = response.trim();
      db.save();
      return { ...db.reviews[reviewIndex] };
    }
    return null;
  },

  // --- GALLERY LIKES SYSTEM (Improved) ---
  async togglePhotoLike(photoId: string, userId: string): Promise<{ liked: boolean; totalLikes: number }> {
    await delay(200);
    
    const existingLikeIndex = db.galleryLikes.findIndex(gl => 
      gl.photoId === photoId && gl.userId === userId
    );

    if (existingLikeIndex > -1) {
      // Remove like
      db.galleryLikes.splice(existingLikeIndex, 1);
    } else {
      // Add like
      const newLike: GalleryLike = {
        userId,
        photoId,
        createdAt: new Date().toISOString()
      };
      db.galleryLikes.push(newLike);

      // Award points to photo owner
      const photo = db.photos.find(p => p.id === photoId);
      if (photo && photo.userId !== userId) {
        const photoOwner = db.users.find(u => u.id === photo.userId);
        if (photoOwner) {
          await this.updateUser(photo.userId, { points: photoOwner.points + 2 }); // +2 points per like
        }
      }
    }

    const totalLikes = db.galleryLikes.filter(gl => gl.photoId === photoId).length;
    db.save();

    return {
      liked: existingLikeIndex === -1,
      totalLikes
    };
  },

  async getPhotoLikes(photoId: string): Promise<{ userIds: string[]; total: number }> {
    await delay(50);
    const likes = db.galleryLikes.filter(gl => gl.photoId === photoId);
    return {
      userIds: likes.map(l => l.userId),
      total: likes.length
    };
  },

  // --- VALIDATION HELPERS ---
  validateUrl(url: string): boolean {
    if (!url || !url.trim()) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },

  validateBirthDate(birthDate: string): boolean {
    const date = new Date(birthDate);
    const today = new Date();
    const year1900 = new Date('1900-01-01');
    
    return date >= year1900 && date <= today;
  },

  validateCheckDates(checkIn: string, checkOut: string): boolean {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    return checkOutDate >= checkInDate;
  },

  // Admin points management
  async adjustUserPoints(userId: string, pointsChange: number, reason: string): Promise<void> {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Validate points change limit
    if (Math.abs(pointsChange) > 500) {
      throw new Error('Ajuste de pontos não pode exceder ±500 pontos');
    }

    const currentPoints = users[userIndex].points || 0;
    const newPoints = Math.max(0, currentPoints + pointsChange); // Prevent negative points
    
    users[userIndex].points = newPoints;
    
    // Create audit log entry
    const auditLog = {
      id: Date.now().toString(),
      userId,
      adminId: 'current-admin', // In real app, get from auth context
      action: pointsChange > 0 ? 'ADD_POINTS' : 'REMOVE_POINTS',
      pointsChange,
      previousPoints: currentPoints,
      newPoints,
      reason,
      timestamp: new Date().toISOString()
    };

    // Store audit log
    const auditLogs = JSON.parse(sessionStorage.getItem('pointsAuditLogs') || '[]');
    auditLogs.push(auditLog);
    sessionStorage.setItem('pointsAuditLogs', JSON.stringify(auditLogs));
    
    sessionStorage.setItem('users', JSON.stringify(users));
  },

  async getPointsAuditLog(userId?: string): Promise<any[]> {
    const auditLogs = JSON.parse(sessionStorage.getItem('pointsAuditLogs') || '[]');
    
    if (userId) {
      return auditLogs.filter((log: any) => log.userId === userId);
    }
    
    return auditLogs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  // Additional validation helpers
  validateWebsiteUrl(url: string): boolean {
    if (!url) return true; // Optional field
    
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },

  // New social profile methods
  async followUser(followerId: string, followingId: string): Promise<void> {
    await this.delay();
    const users = this.db.users;
    
    const followerIndex = users.findIndex(u => u.id === followerId);
    const followingIndex = users.findIndex(u => u.id === followingId);
    
    if (followerIndex === -1 || followingIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Initialize arrays if they don't exist
    if (!users[followerIndex].following) users[followerIndex].following = [];
    if (!users[followingIndex].followers) users[followingIndex].followers = [];

    // Add to following/followers if not already present
    if (!users[followerIndex].following!.includes(followingId)) {
      users[followerIndex].following!.push(followingId);
    }
    
    if (!users[followingIndex].followers!.includes(followerId)) {
      users[followingIndex].followers!.push(followerId);
    }

    this.db.save();
  },

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    await this.delay();
    const users = this.db.users;
    
    const followerIndex = users.findIndex(u => u.id === followerId);
    const followingIndex = users.findIndex(u => u.id === followingId);
    
    if (followerIndex === -1 || followingIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Remove from following/followers
    if (users[followerIndex].following) {
      users[followerIndex].following = users[followerIndex].following!.filter(id => id !== followingId);
    }
    
    if (users[followingIndex].followers) {
      users[followingIndex].followers = users[followingIndex].followers!.filter(id => id !== followerId);
    }

    this.db.save();
  },

  async getUserFollowers(userId: string): Promise<User[]> {
    await this.delay();
    const user = this.db.users.find(u => u.id === userId);
    if (!user || !user.followers) return [];
    
    return this.db.users.filter(u => user.followers!.includes(u.id));
  },

  async getUserFollowing(userId: string): Promise<User[]> {
    await this.delay();
    const user = this.db.users.find(u => u.id === userId);
    if (!user || !user.following) return [];
    
    return this.db.users.filter(u => user.following!.includes(u.id));
  },

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    await this.delay();
    const users = this.db.users;
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Merge updates with existing user data
    users[userIndex] = { ...users[userIndex], ...updates };
    
    this.db.save();
    return users[userIndex];
  },

  async addUserPhoto(photo: Omit<Photo, 'id'>): Promise<Photo> {
    await this.delay();
    const newPhoto: Photo = {
      ...photo,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      likes: []
    };
    
    this.db.photos.push(newPhoto);
    this.db.save();
    return newPhoto;
  },

  async deleteUserPhoto(photoId: string, userId: string): Promise<void> {
    await this.delay();
    const photoIndex = this.db.photos.findIndex(p => p.id === photoId && p.userId === userId);
    
    if (photoIndex === -1) {
      throw new Error('Foto não encontrada ou sem permissão para deletar');
    }

    this.db.photos.splice(photoIndex, 1);
    this.db.save();
  },

  async getUserStats(userId: string): Promise<any> {
    await this.delay();
    const user = this.db.users.find(u => u.id === userId);
    if (!user) throw new Error('Usuário não encontrado');

    const userPhotos = await this.getUserPhotos(userId);
    const userReviews = await this.getUserReviews(userId);
    const userFavorites = await this.getUserFavorites(userId);
    
    const likesReceived = userPhotos.reduce((sum, photo) => sum + (photo.likes?.length || 0), 0);
    const followersCount = user.followers?.length || 0;
    const followingCount = user.following?.length || 0;

    return {
      totalPoints: user.points,
      visitedPois: user.visited.length,
      earnedBadges: user.badges.length,
      photosShared: userPhotos.length,
      likesReceived,
      reviewsWritten: userReviews.length,
      favoriteRestaurants: userFavorites.filter(f => f.entityType === 'restaurant').length,
      favoriteHotels: userFavorites.filter(f => f.entityType === 'hotel').length,
      favoritePois: userFavorites.filter(f => f.entityType === 'poi').length,
      followersCount,
      followingCount,
      checkInsCount: user.visited.length
    };
  }

};