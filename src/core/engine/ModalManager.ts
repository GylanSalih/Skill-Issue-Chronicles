/**
 * 🎯 UNIVERSAL MODAL MANAGER
 *
 * Teil der Core Engine - verwaltet alle Modals im gesamten Spiel.
 * Click-to-open System mit zentraler State-Verwaltung.
 *
 * ✨ Features:
 * - Click to open modal in center
 * - Close on outside click
 * - Close on X button
 * - Universal data structure
 * - Activity start buttons
 * - Integrated with Engine
 */

import { ActivityDefinition, SkillType } from './MelvorEngine';

// ==================== MODAL TYPES ====================

export type ModalType = 'activity' | 'item' | 'resource' | 'skill' | 'custom';

export interface BaseModalData {
  id: string;
  type: ModalType;
  title: string;
  description?: string;
  image?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface ActivityModalData extends BaseModalData {
  type: 'activity';
  activity: ActivityDefinition;
  skillId: SkillType;
  currentLevel: number;
  canPerform: boolean;
  currentAmount?: number;
  estimatedTime?: number;
  // Action buttons
  actions: {
    canStart: boolean;
    canStop: boolean;
    isActive: boolean;
    onStart?: () => void;
    onStop?: () => void;
  };
}

export interface ItemModalData extends BaseModalData {
  type: 'item';
  stats?: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  value?: number;
  stackSize?: number;
  category?: string;
  actions?: {
    canUse?: boolean;
    canSell?: boolean;
    canCraft?: boolean;
    onUse?: () => void;
    onSell?: () => void;
    onCraft?: () => void;
  };
}

export interface ResourceModalData extends BaseModalData {
  type: 'resource';
  amount: number;
  category?: string;
  usedIn?: string[];
  actions?: {
    canSell?: boolean;
    canCraft?: boolean;
    onSell?: () => void;
    onCraft?: () => void;
  };
}

export interface SkillModalData extends BaseModalData {
  type: 'skill';
  skillId: SkillType;
  level: number;
  experience: number;
  totalExperience: number;
  nextLevelExperience: number;
  levelProgress: number;
  activities: ActivityDefinition[];
  actions?: {
    onViewActivities?: () => void;
    onViewStats?: () => void;
  };
}

export interface CustomModalData extends BaseModalData {
  type: 'custom';
  content: any;
  actions?: Record<string, () => void>;
}

export type ModalData =
  | ActivityModalData
  | ItemModalData
  | ResourceModalData
  | SkillModalData
  | CustomModalData;

export interface ModalState {
  isOpen: boolean;
  data: ModalData | null;
  position?: { x: number; y: number };
}

// ==================== MODAL MANAGER CLASS ====================

class ModalManager {
  private modalState: ModalState = {
    isOpen: false,
    data: null,
  };

  private listeners: Array<(state: ModalState) => void> = [];

  // ==================== STATE MANAGEMENT ====================

  public getState(): ModalState {
    return { ...this.modalState };
  }

  public subscribe(listener: (state: ModalState) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  // ==================== MODAL ACTIONS ====================

  public openModal(data: ModalData, position?: { x: number; y: number }): void {
    this.modalState = {
      isOpen: true,
      data,
      position,
    };
    this.notify();
    console.log('🔍 Modal opened:', data.type, data.title);
  }

  public closeModal(): void {
    this.modalState = {
      isOpen: false,
      data: null,
    };
    this.notify();
    console.log('❌ Modal closed');
  }

  public isOpen(): boolean {
    return this.modalState.isOpen;
  }

  public getCurrentModal(): ModalData | null {
    return this.modalState.data;
  }

  // ==================== CONVENIENCE METHODS ====================

  public openActivityModal(
    activity: ActivityDefinition,
    skillId: SkillType,
    currentLevel: number,
    canPerform: boolean,
    actions: ActivityModalData['actions'],
    currentAmount?: number
  ): void {
    const modalData: ActivityModalData = {
      id: `activity-${activity.id}`,
      type: 'activity',
      title: activity.name,
      description: activity.description,
      image: activity.image,
      rarity: activity.rarity,
      activity,
      skillId,
      currentLevel,
      canPerform,
      currentAmount,
      estimatedTime: activity.baseTime,
      actions,
    };

    this.openModal(modalData);
  }

  public openResourceModal(
    resourceId: string,
    name: string,
    description: string,
    amount: number,
    category?: string,
    actions?: ResourceModalData['actions']
  ): void {
    const modalData: ResourceModalData = {
      id: `resource-${resourceId}`,
      type: 'resource',
      title: name,
      description,
      amount,
      category,
      actions,
    };

    this.openModal(modalData);
  }

  public openSkillModal(
    skillId: SkillType,
    name: string,
    level: number,
    experience: number,
    totalExperience: number,
    nextLevelExperience: number,
    levelProgress: number,
    activities: ActivityDefinition[],
    actions?: SkillModalData['actions']
  ): void {
    const modalData: SkillModalData = {
      id: `skill-${skillId}`,
      type: 'skill',
      title: name,
      skillId,
      level,
      experience,
      totalExperience,
      nextLevelExperience,
      levelProgress,
      activities,
      actions,
    };

    this.openModal(modalData);
  }

  // ==================== EVENT HANDLERS ====================

  public handleOutsideClick = (event: MouseEvent): void => {
    // Check if click is outside modal
    const modalElement = document.querySelector('[data-modal="true"]');
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.closeModal();
    }
  };

  public handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen()) {
      this.closeModal();
    }
  };

  // ==================== LIFECYCLE ====================

  public init(): void {
    // Add global event listeners
    document.addEventListener('mousedown', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEscapeKey);
    console.log('🔧 ModalManager initialized');
  }

  public destroy(): void {
    // Remove global event listeners
    document.removeEventListener('mousedown', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEscapeKey);

    // Clear listeners
    this.listeners = [];

    // Reset state
    this.modalState = {
      isOpen: false,
      data: null,
    };

    console.log('🔧 ModalManager destroyed');
  }
}

// ==================== SINGLETON INSTANCE ====================

export const modalManager = new ModalManager();

// Auto-initialize
if (typeof window !== 'undefined') {
  modalManager.init();
}

export default modalManager;
