import { useState, useCallback } from 'react';
import { type Boss } from '../services/bossConfig';

interface Player {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  avatar: string;
  class: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

interface CombatState {
  playerHealth: number;
  bossHealth: number;
  playerMana: number;
  isPlayerTurn: boolean;
  combatLog: string[];
  isCombatActive: boolean;
  isVictory: boolean;
  isDefeat: boolean;
}

export const useBossCombat = (player: Player, boss: Boss) => {
  const [combatState, setCombatState] = useState<CombatState>({
    playerHealth: player.health,
    bossHealth: boss.health,
    playerMana: player.mana,
    isPlayerTurn: true,
    combatLog: [`${player.name} challenges ${boss.name} to battle!`],
    isCombatActive: true,
    isVictory: false,
    isDefeat: false
  });

  const calculateDamage = useCallback((attacker: { attack: number }, defender: { defense: number }): number => {
    const baseDamage = attacker.attack;
    const defense = defender.defense;
    const damageReduction = defense * 0.5; // Defense reduces damage by 50% of its value
    const finalDamage = Math.max(1, baseDamage - damageReduction);
    
    // Add some randomness (±20%)
    const randomFactor = 0.8 + Math.random() * 0.4;
    return Math.floor(finalDamage * randomFactor);
  }, []);

  const playerAttack = useCallback(() => {
    if (!combatState.isPlayerTurn || combatState.isVictory || combatState.isDefeat) return;

    const damage = calculateDamage(player, boss);
    const newBossHealth = Math.max(0, combatState.bossHealth - damage);
    
    setCombatState(prev => ({
      ...prev,
      bossHealth: newBossHealth,
      isPlayerTurn: false,
      combatLog: [...prev.combatLog, `${player.name} attacks ${boss.name} for ${damage} damage!`],
      isVictory: newBossHealth <= 0
    }));

    // Boss attacks back if not defeated
    if (newBossHealth > 0) {
      setTimeout(() => {
        const bossDamage = calculateDamage(boss, player);
        const newPlayerHealth = Math.max(0, combatState.playerHealth - bossDamage);
        
        setCombatState(prev => ({
          ...prev,
          playerHealth: newPlayerHealth,
          isPlayerTurn: true,
          combatLog: [...prev.combatLog, `${boss.name} attacks ${player.name} for ${bossDamage} damage!`],
          isDefeat: newPlayerHealth <= 0
        }));
      }, 1000);
    }
  }, [combatState, player, boss, calculateDamage]);

  const playerDefend = useCallback(() => {
    if (!combatState.isPlayerTurn || combatState.isVictory || combatState.isDefeat) return;

    setCombatState(prev => ({
      ...prev,
      isPlayerTurn: false,
      combatLog: [...prev.combatLog, `${player.name} takes a defensive stance!`]
    }));

    // Boss attacks with reduced damage due to defense
    setTimeout(() => {
      const bossDamage = Math.max(1, calculateDamage(boss, player) * 0.5); // 50% damage reduction
      const newPlayerHealth = Math.max(0, combatState.playerHealth - bossDamage);
      
      setCombatState(prev => ({
        ...prev,
        playerHealth: newPlayerHealth,
        isPlayerTurn: true,
        combatLog: [...prev.combatLog, `${boss.name} attacks ${player.name} for ${bossDamage} damage (defended)!`],
        isDefeat: newPlayerHealth <= 0
      }));
    }, 1000);
  }, [combatState, player, boss, calculateDamage]);

  const playerMagic = useCallback(() => {
    if (!combatState.isPlayerTurn || combatState.isVictory || combatState.isDefeat || combatState.playerMana < 20) return;

    const magicDamage = Math.floor(player.attack * 1.5); // Magic does 50% more damage
    const newBossHealth = Math.max(0, combatState.bossHealth - magicDamage);
    const newPlayerMana = combatState.playerMana - 20;
    
    setCombatState(prev => ({
      ...prev,
      bossHealth: newBossHealth,
      playerMana: newPlayerMana,
      isPlayerTurn: false,
      combatLog: [...prev.combatLog, `${player.name} casts a magic spell for ${magicDamage} damage!`],
      isVictory: newBossHealth <= 0
    }));

    // Boss attacks back if not defeated
    if (newBossHealth > 0) {
      setTimeout(() => {
        const bossDamage = calculateDamage(boss, player);
        const newPlayerHealth = Math.max(0, combatState.playerHealth - bossDamage);
        
        setCombatState(prev => ({
          ...prev,
          playerHealth: newPlayerHealth,
          isPlayerTurn: true,
          combatLog: [...prev.combatLog, `${boss.name} attacks ${player.name} for ${bossDamage} damage!`],
          isDefeat: newPlayerHealth <= 0
        }));
      }, 1000);
    }
  }, [combatState, player, boss, calculateDamage]);

  const playerSpecial = useCallback(() => {
    if (!combatState.isPlayerTurn || combatState.isVictory || combatState.isDefeat || combatState.playerMana < 50) return;

    const specialDamage = Math.floor(player.attack * 2); // Special does double damage
    const newBossHealth = Math.max(0, combatState.bossHealth - specialDamage);
    const newPlayerMana = combatState.playerMana - 50;
    
    setCombatState(prev => ({
      ...prev,
      bossHealth: newBossHealth,
      playerMana: newPlayerMana,
      isPlayerTurn: false,
      combatLog: [...prev.combatLog, `${player.name} uses a special ability for ${specialDamage} damage!`],
      isVictory: newBossHealth <= 0
    }));

    // Boss attacks back if not defeated
    if (newBossHealth > 0) {
      setTimeout(() => {
        const bossDamage = calculateDamage(boss, player);
        const newPlayerHealth = Math.max(0, combatState.playerHealth - bossDamage);
        
        setCombatState(prev => ({
          ...prev,
          playerHealth: newPlayerHealth,
          isPlayerTurn: true,
          combatLog: [...prev.combatLog, `${boss.name} attacks ${player.name} for ${bossDamage} damage!`],
          isDefeat: newPlayerHealth <= 0
        }));
      }, 1000);
    }
  }, [combatState, player, boss, calculateDamage]);

  const resetCombat = useCallback(() => {
    try {
      if (!player || !boss) {
        console.error('Player or boss is undefined:', { player, boss });
        return;
      }
      
      setCombatState({
        playerHealth: player.health,
        bossHealth: boss.health,
        playerMana: player.mana,
        isPlayerTurn: true,
        combatLog: [`${player.name} challenges ${boss.name} to battle!`],
        isCombatActive: true,
        isVictory: false,
        isDefeat: false
      });
    } catch (error) {
      console.error('Error in resetCombat:', error);
    }
  }, [player, boss]);

  const fleeCombat = useCallback(() => {
    setCombatState(prev => ({
      ...prev,
      isCombatActive: false,
      combatLog: [...prev.combatLog, `${player.name} flees from battle!`]
    }));
  }, [player.name]);

  return {
    combatState,
    playerAttack,
    playerDefend,
    playerMagic,
    playerSpecial,
    resetCombat,
    fleeCombat
  };
};
