import { ChefHat, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Cooking.module.scss';

const Cooking: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState('bread');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const recipes = [
    {
      id: 'bread',
      name: 'Bread',
      level: 1,
      ingredients: ['Flour x2', 'Water x1'],
      experience: 15,
      icon: '🍞',
    },
    {
      id: 'soup',
      name: 'Hearty Soup',
      level: 3,
      ingredients: ['Vegetables x3', 'Water x2', 'Salt x1'],
      experience: 30,
      icon: '🍲',
    },
    {
      id: 'cake',
      name: 'Chocolate Cake',
      level: 8,
      ingredients: ['Flour x3', 'Eggs x2', 'Chocolate x2', 'Sugar x1'],
      experience: 60,
      icon: '🎂',
    },
  ];

  const selectedRecipeData = recipes.find(recipe => recipe.id === selectedRecipe);

  return (
    <div className={styles.cooking}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <ChefHat className={styles.titleIcon} />
          <h1>Cooking</h1>
          <span className={styles.level}>Level {level}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Experience</span>
            <span className={styles.statValue}>{experience.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.cookingContent}>
        <div className={styles.recipeSelection}>
          <h2>Select Recipe</h2>
          <div className={styles.recipeGrid}>
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                className={`${styles.recipeCard} ${selectedRecipe === recipe.id ? styles.selected : ''}`}
                onClick={() => setSelectedRecipe(recipe.id)}
              >
                <div className={styles.recipeIcon}>{recipe.icon}</div>
                <div className={styles.recipeName}>{recipe.name}</div>
                <div className={styles.recipeLevel}>Level {recipe.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cookingArea}>
          <h2>Cooking</h2>
          {selectedRecipeData && (
            <div className={styles.cookingInfo}>
              <div className={styles.recipeDetails}>
                <h3>{selectedRecipeData.name}</h3>
                <div className={styles.ingredients}>
                  <h4>Ingredients Required:</h4>
                  <ul>
                    {selectedRecipeData.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.experience}>
                  <span>Experience: {selectedRecipeData.experience}</span>
                </div>
              </div>

              <div className={styles.cookingAction}>
                <button
                  className={`${styles.cookButton} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <ChefHat className={styles.cookIcon} />
                  {isActive ? 'Cooking...' : 'Start Cooking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cooking;