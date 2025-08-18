import { USERS, POINTS_OF_INTEREST, ROUTES, BADGES, HOTEL_CHECKINS } from '../constants';
import type { User, Route, PointOfInterest, Badge, HotelCheckIn } from '../types';

// In-memory database simulation
let users: User[] = JSON.parse(JSON.stringify(USERS));
let routes: Route[] = JSON.parse(JSON.stringify(ROUTES));
let pointsOfInterest: PointOfInterest[] = JSON.parse(JSON.stringify(POINTS_OF_INTEREST));
let badges: Badge[] = BADGES; // Badges are static definitions
let hotelCheckIns: HotelCheckIn[] = JSON.parse(JSON.stringify(HOTEL_CHECKINS));

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const backendService = {
  // --- AUTH ---
  async login(email: string, password: string): Promise<User | null> {
    await delay(500);
    const user = users.find(u => u.email === email && u.password === password);
    return user ? { ...user } : null;
  },

  // --- USERS ---
  async getUserById(userId: string): Promise<User | null> {
    await delay(100);
    const user = users.find(u => u.id === userId);
    return user ? { ...user } : null;
  },
  
  async getLeaderboard(): Promise<User[]> {
      await delay(300);
      return [...users]
        .filter(u => u.role === 'tourist')
        .sort((a,b) => b.points - a.points);
  },

  async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
      await delay(400);
      let userToUpdate = users.find(u => u.id === userId);
      if (userToUpdate) {
          userToUpdate = { ...userToUpdate, ...data };
          users = users.map(u => u.id === userId ? userToUpdate! : u);
          return { ...userToUpdate };
      }
      return null;
  },

  // --- ROUTES ---
  async getRoutes(): Promise<Route[]> {
    await delay(200);
    return [...routes];
  },

  async getRouteById(routeId: string): Promise<Route | null> {
    await delay(100);
    const route = routes.find(r => r.id === routeId);
    return route ? { ...route } : null;
  },

  async createRoute(routeData: Omit<Route, 'id'>): Promise<Route> {
    await delay(500);
    const newRoute: Route = { ...routeData, id: `route-${Date.now()}`};
    routes.push(newRoute);
    return { ...newRoute };
  },

  async updateRoute(routeId: string, routeData: Partial<Route>): Promise<Route | null> {
    await delay(500);
    let routeToUpdate = routes.find(r => r.id === routeId);
    if(routeToUpdate) {
      routeToUpdate = { ...routeToUpdate, ...routeData };
      routes = routes.map(r => r.id === routeId ? routeToUpdate! : r);
      return { ...routeToUpdate };
    }
    return null;
  },

  async deleteRoute(routeId: string): Promise<boolean> {
    await delay(500);
    const initialLength = routes.length;
    routes = routes.filter(r => r.id !== routeId);
    return routes.length < initialLength;
  },

  // --- POINTS OF INTEREST ---
  async getPointsOfInterest(): Promise<PointOfInterest[]> {
    await delay(100);
    return [...pointsOfInterest];
  },

  async getPointOfInterestById(poiId: string): Promise<PointOfInterest | null> {
    await delay(50);
    const poi = pointsOfInterest.find(p => p.id === poiId);
    return poi ? { ...poi } : null;
  },

  async createPointOfInterest(poiData: Omit<PointOfInterest, 'id'>): Promise<PointOfInterest> {
    await delay(500);
    const newPoi: PointOfInterest = { ...poiData, id: `poi-${Date.now()}`};
    pointsOfInterest.push(newPoi);
    return { ...newPoi };
  },

  async updatePointOfInterest(poiId: string, poiData: Partial<PointOfInterest>): Promise<PointOfInterest | null> {
    await delay(500);
    let poiToUpdate = pointsOfInterest.find(p => p.id === poiId);
    if(poiToUpdate) {
      poiToUpdate = { ...poiToUpdate, ...poiData };
      pointsOfInterest = pointsOfInterest.map(p => p.id === poiId ? poiToUpdate! : p);
      return { ...poiToUpdate };
    }
    return null;
  },
  
  async deletePointOfInterest(poiId: string): Promise<boolean> {
      await delay(500);
      const initialLength = pointsOfInterest.length;
      pointsOfInterest = pointsOfInterest.filter(p => p.id !== poiId);
      // Also remove from any routes
      routes.forEach(route => {
          route.pointsOfInterest = route.pointsOfInterest.filter(id => id !== poiId);
      });
      return pointsOfInterest.length < initialLength;
  },
  
  // --- GAMIFICATION ---
  async checkIn(userId: string, pointId: string): Promise<{ success: boolean; message: string; newBadges: Badge[] }> {
    await delay(800);
    const user = users.find(u => u.id === userId);
    const point = pointsOfInterest.find(p => p.id === pointId);

    if (!user || !point) {
      return { success: false, message: 'Usuário ou Ponto Turístico não encontrado.', newBadges: [] };
    }

    if (user.visited.some(v => v.pointId === pointId)) {
      return { success: false, message: 'Você já fez check-in neste local.', newBadges: [] };
    }

    // Update user stats
    user.points += point.points;
    user.visited.push({ pointId, date: new Date().toISOString() });
    
    let message = `Check-in realizado! Você ganhou ${point.points} pontos.`;

    // Check for new badges
    const newBadges: Badge[] = [];
    const visitedIds = new Set(user.visited.map(v => v.pointId));
    
    for (const badge of badges) {
      if (!user.badges.includes(badge.id) && badge.criteria(visitedIds)) {
        user.badges.push(badge.id);
        newBadges.push(badge);
      }
    }

    // Check for route completion
    routes.forEach(route => {
        const hasCompletedBefore = user.routeProgress.some(p => p.routeId === route.id);
        if (!hasCompletedBefore) {
            const requiredPois = new Set(route.pointsOfInterest);
            const completedRoute = [...requiredPois].every(poiId => visitedIds.has(poiId));
            
            if (completedRoute) {
                user.routeProgress.push({
                    routeId: route.id,
                    status: 'completed',
                    completedDate: new Date().toISOString()
                });
                user.points += 100; // Bonus points
                message += ` Parabéns, você completou a rota "${route.name}" e ganhou 100 pontos bônus!`;
            }
        }
    });

    users = users.map(u => u.id === userId ? user : u);
    
    return { success: true, message, newBadges };
  },

  async getBadgesForUser(userId: string): Promise<Badge[]> {
      await delay(200);
      const user = users.find(u => u.id === userId);
      if(!user) return [];
      return badges.filter(b => user.badges.includes(b.id));
  },
  
  async getAllBadges(): Promise<Badge[]> {
      await delay(100);
      return [...badges];
  },

  // --- HOTEL ---
  async getHotelCheckIns(hotelId: string): Promise<HotelCheckIn[]> {
    await delay(300);
    return [...hotelCheckIns].filter(ci => ci.hotelId === hotelId);
  },

  async createHotelCheckIn(hotelId: string, checkInData: Omit<HotelCheckIn, 'id' | 'hotelId'>): Promise<HotelCheckIn> {
    await delay(600);
    const newCheckIn: HotelCheckIn = {
      ...checkInData,
      id: `hc-${Date.now()}`,
      hotelId,
    };
    hotelCheckIns.push(newCheckIn);
    // Potentially create a new tourist user here if they don't exist
    return { ...newCheckIn };
  },

  // --- ADMIN DASHBOARD ---
  async getAdminStats(): Promise<any> {
    await delay(400);
    const touristUsers = users.filter(u => u.role === 'tourist');
    const totalCheckIns = touristUsers.reduce((sum, user) => sum + user.visited.length, 0);
    
    const visitCounts: { [key: string]: number } = {};
    touristUsers.forEach(user => {
        user.visited.forEach(visit => {
            visitCounts[visit.pointId] = (visitCounts[visit.pointId] || 0) + 1;
        });
    });
    
    const mostVisitedPoiId = Object.keys(visitCounts).sort((a,b) => visitCounts[b] - visitCounts[a])[0];
    const mostVisitedPoi = pointsOfInterest.find(p => p.id === mostVisitedPoiId);
    
    return {
        totalTourists: touristUsers.length,
        totalCheckIns,
        mostVisitedPoi: mostVisitedPoi ? mostVisitedPoi.name : 'N/A',
        totalRoutes: routes.length,
    }
  },
  
  async getAnalyticsData(): Promise<any> {
      await delay(700);

      const countBy = (arr: any[], key: string) => arr.reduce((acc, item) => {
          acc[item[key]] = (acc[item[key]] || 0) + 1;
          return acc;
      }, {});

      const getAge = (birthDate: string) => new Date().getFullYear() - new Date(birthDate).getFullYear();

      const ageRanges = hotelCheckIns.reduce((acc, item) => {
          const age = getAge(item.birthDate);
          if (age <= 18) acc['0-18']++;
          else if (age <= 30) acc['19-30']++;
          else if (age <= 45) acc['31-45']++;
          else if (age <= 60) acc['46-60']++;
          else acc['61+']++;
          return acc;
      }, { '0-18': 0, '19-30': 0, '31-45': 0, '46-60': 0, '61+': 0 });
      
      const completionsByRoute = users.reduce((acc, user) => {
        user.routeProgress.forEach(progress => {
            const routeName = routes.find(r => r.id === progress.routeId)?.name || 'Rota Desconhecida';
            acc[routeName] = (acc[routeName] || 0) + 1;
        });
        return acc;
      }, {} as {[key: string]: number});
      
      const mostPopularRouteId = Object.keys(completionsByRoute).sort((a,b) => completionsByRoute[b] - completionsByRoute[a])[0];

      return {
          demographics: {
              byGender: countBy(hotelCheckIns, 'gender'),
              byNationality: countBy(hotelCheckIns, 'nationality'),
              ageRanges,
          },
          travelBehavior: {
              byReason: countBy(hotelCheckIns, 'travelReason'),
              byTransport: countBy(hotelCheckIns, 'transportMean'),
              byDiscovery: countBy(hotelCheckIns, 'discoveryChannel'),
          },
          satisfaction: {
              poi: countBy(hotelCheckIns, 'poiOpinion'),
              city: countBy(hotelCheckIns, 'cityOpinion'),
          },
          routeAnalytics: {
              completionsByRoute,
              mostPopularRoute: mostPopularRouteId || 'N/A'
          }
      };
  }

};