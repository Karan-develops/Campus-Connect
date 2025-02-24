export interface User {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  }
  
  export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    user: User;
  }
  
  export interface SkillExchangeListing {
    id: string;
    offeredSkill: string;
    desiredSkill: string;
    description: string;
    user: User;
    likes: number;
    likedBy: string[];
    comments: Comment[];
    createdAt: Date;
  }
  