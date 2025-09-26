/**
 * 🎮 MELVOR IDLE ENGINE - ZENTRALE GAME LOGIC
 *
 * Diese Engine ist das Herzstück des gesamten Spiels.
 * ALLE Skill-Aktivitäten, Timer, Rewards und Events laufen hier durch.
 *
 * ✨ Features:
 * - Universelles Skill-System für alle Aktivitäten
 * - Zentrale Timer-Verwaltung
 * - Event-basierte UI-Updates
 * - Einheitliche Reward-Berechnung
 * - Save/Load Integration
 * - Performance-optimierte Game Loop
 */

// Custom EventEmitter implementation for browser compatibility
class EventEmitter {
  private events: Record<string, Function[]> = {};

  on(event: string, listener: Function): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  off(event: string, listener: Function): this {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }

  emit(event: string, ...args: any[]): boolean {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => listener(...args));
    return true;
  }

  removeAllListeners(event?: string): this {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }
}

// ==================== CORE TYPES ====================

export type SkillType =
  | 'woodcutting'
  | 'mining'
  | 'fishing'
  | 'cooking'
  | 'smithing'
  | 'fletching'
  | 'firemaking'
  | 'runecrafting'
  | 'herblore';

export type ActivityStatus = 'idle' | 'active' | 'paused' | 'completed';

export type ResourceType =
  | 'wood'
  | 'ore'
  | 'fish'
  | 'food'
  | 'bars'
  | 'arrows'
  | 'runes'
  | 'potions'
  | 'essence'
  | 'rare_items';

export interface SkillDefinition {
  id: SkillType;
  name: string;
  description: string;
  maxLevel: number;
  experienceTable: number[]; // XP required for each level
  activities: Record<string, ActivityDefinition>;
}

export interface ActivityDefinition {
  id: string;
  name: string;
  skillId: SkillType;
  requiredLevel: number;
  baseTime: number; // in seconds
  baseRewards: RewardDefinition[];
  requirements?: ActivityRequirement[];
  unlockConditions?: UnlockCondition[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image?: string;
  description: string;
}

export interface RewardDefinition {
  resourceType: ResourceType;
  resourceId: string;
  minAmount: number;
  maxAmount: number;
  chance: number; // 0-1
  experienceGain: number;
}

export interface ActivityRequirement {
  type: 'stamina' | 'resource' | 'tool' | 'level';
  amount: number;
  resourceId?: string;
}

export interface UnlockCondition {
  type: 'level' | 'quest' | 'achievement';
  value: any;
}

// ==================== GAME STATE ====================

export interface GameState {
  // Player Progress
  skills: Record<SkillType, SkillState>;
  resources: Record<string, number>;

  // Current Activities
  activeActivities: Record<SkillType, ActiveActivity | null>;

  // Game Settings
  settings: GameSettings;

  // Statistics
  statistics: GameStatistics;

  // Meta Data
  lastSaved: number;
  totalPlayTime: number;
  gameVersion: string;
}

export interface SkillState {
  id: SkillType;
  level: number;
  experience: number;
  totalExperience: number;
  isActive: boolean;
}

export interface ActiveActivity {
  activityId: string;
  skillId: SkillType;
  startTime: number;
  duration: number;
  progress: number; // 0-100
  isLooping: boolean;
  loopCount: number;
  estimatedCompletion: number;
}

export interface GameSettings {
  notifications: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  performanceMode: boolean;
}

export interface GameStatistics {
  totalActivitiesCompleted: number;
  totalExperienceGained: number;
  totalResourcesGathered: number;
  skillStatistics: Record<SkillType, SkillStatistics>;
}

export interface SkillStatistics {
  activitiesCompleted: number;
  experienceGained: number;
  timeSpent: number; // in seconds
  resourcesGathered: Record<string, number>;
}

// ==================== EVENTS ====================

export interface GameEvents {
  // Activity Events
  'activity:started': (activity: ActiveActivity) => void;
  'activity:completed': (result: ActivityResult) => void;
  'activity:stopped': (activityId: string, skillId: SkillType) => void;
  'activity:progress': (activity: ActiveActivity) => void;

  // Skill Events
  'skill:levelup': (
    skillId: SkillType,
    newLevel: number,
    oldLevel: number
  ) => void;
  'skill:experience': (
    skillId: SkillType,
    experienceGained: number,
    totalExperience: number
  ) => void;

  // Resource Events
  'resource:gained': (
    resourceId: string,
    amount: number,
    totalAmount: number
  ) => void;
  'resource:lost': (
    resourceId: string,
    amount: number,
    totalAmount: number
  ) => void;

  // Game Events
  'game:tick': (deltaTime: number) => void;
  'game:saved': (gameState: GameState) => void;
  'game:loaded': (gameState: GameState) => void;
  'game:paused': () => void;
  'game:resumed': () => void;

  // Achievement Events
  'achievement:unlocked': (achievementId: string) => void;

  // Error Events
  'error:activity': (error: string, activityId: string) => void;
  'error:save': (error: string) => void;
}

export interface ActivityResult {
  activityId: string;
  skillId: SkillType;
  duration: number;
  rewards: RewardResult[];
  experienceGained: number;
  completedAt: number;
}

export interface RewardResult {
  resourceType: ResourceType;
  resourceId: string;
  amount: number;
  isRare: boolean;
}

// ==================== MELVOR ENGINE CLASS ====================

export class MelvorEngine extends EventEmitter {
  private gameState: GameState;
  private skillDefinitions: Record<SkillType, SkillDefinition>;
  private isRunning: boolean = false;
  private gameLoopInterval: number | null = null;
  private lastTickTime: number = 0;
  private tickRate: number = 100; // ms

  constructor() {
    super();
    this.gameState = this.createInitialGameState();
    this.skillDefinitions = this.loadSkillDefinitions();
    this.setupEventHandlers();
    this.setupPersistence();
  }

  // ==================== INITIALIZATION ====================

  private createInitialGameState(): GameState {
    const initialSkills: Record<SkillType, SkillState> = {
      woodcutting: {
        id: 'woodcutting',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      mining: {
        id: 'mining',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      fishing: {
        id: 'fishing',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      cooking: {
        id: 'cooking',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      smithing: {
        id: 'smithing',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      fletching: {
        id: 'fletching',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      firemaking: {
        id: 'firemaking',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      runecrafting: {
        id: 'runecrafting',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
      herblore: {
        id: 'herblore',
        level: 1,
        experience: 0,
        totalExperience: 0,
        isActive: false,
      },
    };

    return {
      skills: initialSkills,
      resources: {},
      activeActivities: {
        woodcutting: null,
        mining: null,
        fishing: null,
        cooking: null,
        smithing: null,
        fletching: null,
        firemaking: null,
        runecrafting: null,
        herblore: null,
      },
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: 'dark',
        performanceMode: false,
      },
      statistics: {
        totalActivitiesCompleted: 0,
        totalExperienceGained: 0,
        totalResourcesGathered: 0,
        skillStatistics: Object.keys(initialSkills).reduce(
          (acc, skillId) => {
            acc[skillId as SkillType] = {
              activitiesCompleted: 0,
              experienceGained: 0,
              timeSpent: 0,
              resourcesGathered: {},
            };
            return acc;
          },
          {} as Record<SkillType, SkillStatistics>
        ),
      },
      lastSaved: Date.now(),
      totalPlayTime: 0,
      gameVersion: '1.0.0',
    };
  }

  private loadSkillDefinitions(): Record<SkillType, SkillDefinition> {
    // This will be loaded dynamically or set externally
    // For now, return empty object - will be populated by setSkillDefinitions()
    return {} as Record<SkillType, SkillDefinition>;
  }

  // Method to set skill definitions externally
  public setSkillDefinitions(
    definitions: Record<SkillType, SkillDefinition>
  ): void {
    this.skillDefinitions = definitions;
  }

  private setupEventHandlers(): void {
    // Setup internal event handlers
    this.on('activity:completed', this.handleActivityCompleted.bind(this));
    this.on('skill:experience', this.handleSkillExperience.bind(this));
  }

  private setupPersistence(): void {
    // Listen for auto-save events
    if (typeof window !== 'undefined') {
      window.addEventListener('melvor-auto-save', () => {
        this.saveGame();
      });

      // Try to load existing save data
      this.loadGameFromStorage();
    }
  }

  // ==================== GAME CONTROL ====================

  public startGame(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastTickTime = Date.now();

    this.gameLoopInterval = setInterval(() => {
      this.gameTick();
    }, this.tickRate);

    this.emit('game:resumed');
  }

  public pauseGame(): void {
    if (!this.isRunning) return;

    this.isRunning = false;

    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = null;
    }

    this.emit('game:paused');
  }

  public isGameRunning(): boolean {
    return this.isRunning;
  }

  // ==================== GAME LOOP ====================

  private gameTick(): void {
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastTickTime;
    this.lastTickTime = currentTime;

    // Update total play time
    this.gameState.totalPlayTime += deltaTime;

    // Process all active activities
    this.processActiveActivities(deltaTime);

    this.emit('game:tick', deltaTime);
  }

  private processActiveActivities(deltaTime: number): void {
    Object.entries(this.gameState.activeActivities).forEach(
      ([skillId, activity]) => {
        if (!activity || !this.isRunning) return;

        // Calculate progress
        const elapsed = Date.now() - activity.startTime;
        const progress = Math.min(
          100,
          (elapsed / (activity.duration * 1000)) * 100
        );

        activity.progress = progress;
        activity.estimatedCompletion =
          activity.startTime + activity.duration * 1000;

        // Check if activity is completed
        if (progress >= 100) {
          this.completeActivity(skillId as SkillType, activity);
        } else {
          this.emit('activity:progress', activity);
        }
      }
    );
  }

  // ==================== ACTIVITY MANAGEMENT ====================

  public startActivity(
    skillId: SkillType,
    activityId: string,
    options: { loop?: boolean } = {}
  ): boolean {
    try {
      // Validate skill and activity
      const skillDef = this.skillDefinitions[skillId];
      if (!skillDef) {
        this.emit('error:activity', `Skill ${skillId} not found`, activityId);
        return false;
      }

      const activityDef = skillDef.activities[activityId];
      if (!activityDef) {
        this.emit(
          'error:activity',
          `Activity ${activityId} not found in skill ${skillId}`,
          activityId
        );
        return false;
      }

      // Check requirements
      if (!this.canPerformActivity(skillId, activityId)) {
        this.emit(
          'error:activity',
          `Requirements not met for activity ${activityId}`,
          activityId
        );
        return false;
      }

      // Stop any existing activity for this skill
      this.stopActivity(skillId);

      // Create new active activity
      const activeActivity: ActiveActivity = {
        activityId,
        skillId,
        startTime: Date.now(),
        duration: activityDef.baseTime,
        progress: 0,
        isLooping: options.loop || false,
        loopCount: 0,
        estimatedCompletion: Date.now() + activityDef.baseTime * 1000,
      };

      // Set activity as active
      this.gameState.activeActivities[skillId] = activeActivity;
      this.gameState.skills[skillId].isActive = true;

      this.emit('activity:started', activeActivity);
      return true;
    } catch (error) {
      this.emit(
        'error:activity',
        `Failed to start activity: ${error}`,
        activityId
      );
      return false;
    }
  }

  public stopActivity(skillId: SkillType): void {
    const activity = this.gameState.activeActivities[skillId];
    if (!activity) return;

    this.gameState.activeActivities[skillId] = null;
    this.gameState.skills[skillId].isActive = false;

    this.emit('activity:stopped', activity.activityId, skillId);
  }

  public toggleActivityLoop(skillId: SkillType): boolean {
    const activity = this.gameState.activeActivities[skillId];
    if (!activity) return false;

    activity.isLooping = !activity.isLooping;
    return activity.isLooping;
  }

  private completeActivity(skillId: SkillType, activity: ActiveActivity): void {
    const skillDef = this.skillDefinitions[skillId];
    const activityDef = skillDef?.activities[activity.activityId];

    if (!activityDef) return;

    // Calculate rewards
    const rewards = this.calculateRewards(activityDef);
    const experienceGained = this.calculateExperience(activityDef, rewards);

    // Create result
    const result: ActivityResult = {
      activityId: activity.activityId,
      skillId,
      duration: activity.duration,
      rewards,
      experienceGained,
      completedAt: Date.now(),
    };

    // Apply rewards and experience
    this.applyActivityResult(result);

    // Update statistics
    this.updateStatistics(result);

    // Handle looping
    if (
      activity.isLooping &&
      this.canPerformActivity(skillId, activity.activityId)
    ) {
      // Restart activity
      activity.startTime = Date.now();
      activity.progress = 0;
      activity.loopCount++;
      activity.estimatedCompletion = Date.now() + activity.duration * 1000;
    } else {
      // Stop activity
      this.stopActivity(skillId);
    }

    this.emit('activity:completed', result);
  }

  // ==================== REWARD SYSTEM ====================

  private calculateRewards(activityDef: ActivityDefinition): RewardResult[] {
    const rewards: RewardResult[] = [];

    activityDef.baseRewards.forEach(rewardDef => {
      // Check if reward is obtained (based on chance)
      if (Math.random() <= rewardDef.chance) {
        const amount =
          Math.floor(
            Math.random() * (rewardDef.maxAmount - rewardDef.minAmount + 1)
          ) + rewardDef.minAmount;

        rewards.push({
          resourceType: rewardDef.resourceType,
          resourceId: rewardDef.resourceId,
          amount,
          isRare: rewardDef.chance < 0.1, // Consider anything under 10% chance as rare
        });
      }
    });

    return rewards;
  }

  private calculateExperience(
    activityDef: ActivityDefinition,
    rewards: RewardResult[]
  ): number {
    // Base experience from activity
    let totalExp = 0;

    rewards.forEach(reward => {
      const rewardDef = activityDef.baseRewards.find(
        r => r.resourceId === reward.resourceId
      );
      if (rewardDef) {
        totalExp += rewardDef.experienceGain * reward.amount;
      }
    });

    return totalExp;
  }

  private applyActivityResult(result: ActivityResult): void {
    // Apply resource rewards
    result.rewards.forEach(reward => {
      this.addResource(reward.resourceId, reward.amount);
    });

    // Apply experience
    this.addExperience(result.skillId, result.experienceGained);
  }

  // ==================== RESOURCE MANAGEMENT ====================

  public addResource(resourceId: string, amount: number): void {
    const currentAmount = this.gameState.resources[resourceId] || 0;
    const newAmount = currentAmount + amount;

    this.gameState.resources[resourceId] = newAmount;

    this.emit('resource:gained', resourceId, amount, newAmount);
  }

  public removeResource(resourceId: string, amount: number): boolean {
    const currentAmount = this.gameState.resources[resourceId] || 0;

    if (currentAmount < amount) {
      return false; // Not enough resources
    }

    const newAmount = currentAmount - amount;
    this.gameState.resources[resourceId] = newAmount;

    this.emit('resource:lost', resourceId, amount, newAmount);
    return true;
  }

  public getResource(resourceId: string): number {
    return this.gameState.resources[resourceId] || 0;
  }

  public hasResource(resourceId: string, amount: number): boolean {
    return this.getResource(resourceId) >= amount;
  }

  // ==================== EXPERIENCE & LEVELING ====================

  public addExperience(skillId: SkillType, amount: number): void {
    const skill = this.gameState.skills[skillId];
    const oldLevel = skill.level;

    skill.experience += amount;
    skill.totalExperience += amount;

    // Check for level up
    const newLevel = this.calculateLevelFromExperience(
      skillId,
      skill.totalExperience
    );

    if (newLevel > oldLevel) {
      skill.level = newLevel;
      skill.experience =
        skill.totalExperience - this.getExperienceForLevel(skillId, newLevel);

      this.emit('skill:levelup', skillId, newLevel, oldLevel);
    }

    this.emit('skill:experience', skillId, amount, skill.totalExperience);
  }

  private calculateLevelFromExperience(
    skillId: SkillType,
    totalExperience: number
  ): number {
    const skillDef = this.skillDefinitions[skillId];
    if (!skillDef) return 1;

    let level = 1;
    let expRequired = 0;

    for (let i = 0; i < skillDef.experienceTable.length; i++) {
      expRequired += skillDef.experienceTable[i];
      if (totalExperience >= expRequired) {
        level = i + 2; // +2 because array starts at 0 but level starts at 1
      } else {
        break;
      }
    }

    return Math.min(level, skillDef.maxLevel);
  }

  private getExperienceForLevel(skillId: SkillType, level: number): number {
    const skillDef = this.skillDefinitions[skillId];
    if (!skillDef || level <= 1) return 0;

    let totalExp = 0;
    for (
      let i = 0;
      i < Math.min(level - 1, skillDef.experienceTable.length);
      i++
    ) {
      totalExp += skillDef.experienceTable[i];
    }

    return totalExp;
  }

  // ==================== VALIDATION ====================

  public canPerformActivity(skillId: SkillType, activityId: string): boolean {
    const skillDef = this.skillDefinitions[skillId];
    const activityDef = skillDef?.activities[activityId];

    if (!activityDef) return false;

    // Check level requirement
    if (this.gameState.skills[skillId].level < activityDef.requiredLevel) {
      return false;
    }

    // Check other requirements
    if (activityDef.requirements) {
      for (const req of activityDef.requirements) {
        if (!this.checkRequirement(req)) {
          return false;
        }
      }
    }

    return true;
  }

  private checkRequirement(requirement: ActivityRequirement): boolean {
    switch (requirement.type) {
      case 'resource':
        return requirement.resourceId
          ? this.hasResource(requirement.resourceId, requirement.amount)
          : false;

      case 'level':
        // This would check specific skill levels
        return true; // Simplified for now

      case 'stamina':
        // This would check player stamina
        return true; // Simplified for now

      case 'tool':
        // This would check if player has required tool
        return true; // Simplified for now

      default:
        return true;
    }
  }

  // ==================== STATISTICS ====================

  private updateStatistics(result: ActivityResult): void {
    // Update global statistics
    this.gameState.statistics.totalActivitiesCompleted++;
    this.gameState.statistics.totalExperienceGained += result.experienceGained;

    // Update skill-specific statistics
    const skillStats =
      this.gameState.statistics.skillStatistics[result.skillId];
    skillStats.activitiesCompleted++;
    skillStats.experienceGained += result.experienceGained;
    skillStats.timeSpent += result.duration;

    // Update resource statistics
    result.rewards.forEach(reward => {
      const currentAmount =
        skillStats.resourcesGathered[reward.resourceId] || 0;
      skillStats.resourcesGathered[reward.resourceId] =
        currentAmount + reward.amount;
      this.gameState.statistics.totalResourcesGathered += reward.amount;
    });
  }

  // ==================== SAVE/LOAD ====================

  public saveGame(): boolean {
    try {
      this.gameState.lastSaved = Date.now();

      // Import persistence manager dynamically to avoid circular imports
      import('./PersistenceManager').then(({ persistenceManager }) => {
        const success = persistenceManager.saveGame(this.gameState);
        if (success) {
          this.emit('game:saved', this.gameState);
        } else {
          this.emit('error:save', 'Failed to save game to storage');
        }
      });

      return true;
    } catch (error) {
      this.emit('error:save', `Failed to save game: ${error}`);
      return false;
    }
  }

  public loadGame(gameState: GameState): boolean {
    try {
      this.gameState = gameState;
      this.emit('game:loaded', gameState);
      return true;
    } catch (error) {
      this.emit('error:save', `Failed to load game: ${error}`);
      return false;
    }
  }

  private async loadGameFromStorage(): Promise<void> {
    try {
      const { persistenceManager } = await import('./PersistenceManager');
      const savedGameState = persistenceManager.loadGame();

      if (savedGameState) {
        this.gameState = savedGameState;
        console.log('🎮 Game loaded from storage');
        this.emit('game:loaded', savedGameState);
      } else {
        console.log('🎮 No saved game found, starting fresh');
      }
    } catch (error) {
      console.error('❌ Failed to load game from storage:', error);
    }
  }

  // ==================== GETTERS ====================

  public getGameState(): Readonly<GameState> {
    return this.gameState;
  }

  public getSkill(skillId: SkillType): Readonly<SkillState> {
    return this.gameState.skills[skillId];
  }

  public getActiveActivity(
    skillId: SkillType
  ): Readonly<ActiveActivity> | null {
    return this.gameState.activeActivities[skillId];
  }

  public getAllActiveActivities(): Readonly<
    Record<SkillType, ActiveActivity | null>
  > {
    return this.gameState.activeActivities;
  }

  public getSkillDefinition(
    skillId: SkillType
  ): Readonly<SkillDefinition> | undefined {
    return this.skillDefinitions[skillId];
  }

  public getAllSkillDefinitions(): Readonly<
    Record<SkillType, SkillDefinition>
  > {
    return this.skillDefinitions;
  }

  // ==================== EVENT HANDLERS ====================

  private handleActivityCompleted(result: ActivityResult): void {
    // Handle any global logic when activities complete
    console.log(
      `Activity ${result.activityId} completed for skill ${result.skillId}`
    );
  }

  private handleSkillExperience(
    skillId: SkillType,
    experienceGained: number,
    totalExperience: number
  ): void {
    // Handle any global logic when experience is gained
    console.log(
      `Skill ${skillId} gained ${experienceGained} experience (total: ${totalExperience})`
    );
  }

  // ==================== UTILITY METHODS ====================

  public getEstimatedCompletion(skillId: SkillType): number | null {
    const activity = this.gameState.activeActivities[skillId];
    return activity ? activity.estimatedCompletion : null;
  }

  public getActivityProgress(skillId: SkillType): number {
    const activity = this.gameState.activeActivities[skillId];
    return activity ? activity.progress : 0;
  }

  public isSkillActive(skillId: SkillType): boolean {
    return this.gameState.skills[skillId].isActive;
  }

  public getNextLevelExperience(skillId: SkillType): number {
    const skill = this.gameState.skills[skillId];
    const nextLevelExp = this.getExperienceForLevel(skillId, skill.level + 1);
    return nextLevelExp - skill.totalExperience;
  }

  public getLevelProgress(skillId: SkillType): number {
    const skill = this.gameState.skills[skillId];
    const currentLevelExp = this.getExperienceForLevel(skillId, skill.level);
    const nextLevelExp = this.getExperienceForLevel(skillId, skill.level + 1);
    const progressExp = skill.totalExperience - currentLevelExp;
    const requiredExp = nextLevelExp - currentLevelExp;

    return requiredExp > 0 ? (progressExp / requiredExp) * 100 : 100;
  }
}

// ==================== SINGLETON INSTANCE ====================

export const melvorEngine = new MelvorEngine();

// ==================== REACT HOOK ====================

export const useMelvorEngine = () => {
  return melvorEngine;
};
