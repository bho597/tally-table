// ============================================================
// Tally & Table — Database Types v2
// ============================================================

export type QuantityMode = 'count' | 'weight' | 'volume' | 'simple';
export type StockLevel = 'full' | 'half' | 'low' | 'out';
export type PantryUnit =
  | 'items'
  | 'g' | 'kg' | 'oz' | 'lb'
  | 'ml' | 'l' | 'fl_oz' | 'cup' | 'tsp' | 'tbsp';

export type PantryCategory =
  | 'produce' | 'dairy' | 'proteins' | 'grains'
  | 'canned' | 'frozen' | 'oils' | 'spices'
  | 'baking' | 'snacks' | 'beverages' | 'other';

export type IngredientUnit =
  | 'g' | 'kg' | 'ml' | 'l'
  | 'tsp' | 'tbsp' | 'cup'
  | 'oz' | 'lb'
  | 'piece' | 'pinch' | 'handful' | 'to_taste';

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type HouseholdRole = 'owner' | 'member';

// ============================================================
// PANTRY ITEM — two shapes depending on quantity_mode
// ============================================================

interface PantryItemBase {
  id: string;
  household_id: string;
  name: string;
  category: PantryCategory;
  notes: string | null;
  expiry_date: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PantryItemSimple extends PantryItemBase {
  quantity_mode: 'simple';
  stock_level: StockLevel;
  quantity: null;
  unit: null;
  low_threshold: null;
}

export interface PantryItemPrecise extends PantryItemBase {
  quantity_mode: 'count' | 'weight' | 'volume';
  quantity: number;
  unit: PantryUnit;
  low_threshold: number | null;
  stock_level: null;
}

export type PantryItem = PantryItemSimple | PantryItemPrecise;

// ============================================================
// HELPERS
// ============================================================

export function getEffectiveStockLevel(item: PantryItem): StockLevel {
  if (item.quantity_mode === 'simple') return item.stock_level;
  if (item.low_threshold !== null) {
    if (item.quantity <= 0) return 'out';
    if (item.quantity <= item.low_threshold) return 'low';
    if (item.quantity <= item.low_threshold * 2) return 'half';
    return 'full';
  }
  return 'full';
}

export function calculateGroceryQuantity(
  needed: number,
  available: number | null,
  lowThreshold: number | null,
): number {
  if (available === null) return needed;
  const remaining = available - needed;
  if (remaining >= 0 && (lowThreshold === null || remaining >= lowThreshold)) {
    return 0;
  }
  return Math.max(needed - available, 0);
}

// ============================================================
// OTHER TABLE TYPES
// ============================================================

export interface Household {
  id: string;
  name: string;
  invite_code: string;
  created_at: string;
  updated_at: string;
}

export interface HouseholdMember {
  id: string;
  household_id: string;
  user_id: string;
  role: HouseholdRole;
  joined_at: string;
}

export interface Profile {
  id: string;
  household_id: string | null;
  display_name: string | null;
  avatar_url: string | null;
  is_pro: boolean;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  household_id: string;
  name: string;
  description: string | null;
  servings: number;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  source_url: string | null;
  tags: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  name: string;
  amount: number | null;
  unit: IngredientUnit | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
}

export interface RecipeStep {
  id: string;
  recipe_id: string;
  step_number: number;
  instruction: string;
  created_at: string;
}

export interface MealPlanEntry {
  id: string;
  household_id: string;
  recipe_id: string | null;
  date: string;
  meal_slot: MealSlot;
  servings: number;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface GroceryList {
  id: string;
  household_id: string;
  name: string;
  week_start: string;
  generated_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface GroceryListItem {
  id: string;
  grocery_list_id: string;
  name: string;
  amount: number | null;
  unit: IngredientUnit | null;
  category: PantryCategory;
  is_checked: boolean;
  recipe_sources: string[];
  from_pantry_low: boolean;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ============================================================
// EXTENDED TYPES (with joins)
// ============================================================

export interface RecipeWithIngredients extends Recipe {
  recipe_ingredients: RecipeIngredient[];
  recipe_steps: RecipeStep[];
}

export interface MealPlanEntryWithRecipe extends MealPlanEntry {
  recipe: Recipe | null;
}

export interface GroceryListWithItems extends GroceryList {
  grocery_list_items: GroceryListItem[];
}

// ============================================================
// INSERT / UPDATE TYPES
// ============================================================

export type InsertHousehold = Pick<Household, 'name'>;
export type InsertPantryItem = Omit<PantryItem, 'id' | 'created_at' | 'updated_at'>;
export type InsertRecipe = Omit<Recipe, 'id' | 'created_at' | 'updated_at'>;
export type InsertRecipeIngredient = Omit<RecipeIngredient, 'id' | 'created_at'>;
export type InsertRecipeStep = Omit<RecipeStep, 'id' | 'created_at'>;
export type InsertMealPlanEntry = Omit<MealPlanEntry, 'id' | 'created_at' | 'updated_at'>;
export type InsertGroceryList = Omit<GroceryList, 'id' | 'created_at' | 'updated_at'>;
export type InsertGroceryListItem = Omit<GroceryListItem, 'id' | 'created_at' | 'updated_at'>;

export type UpdatePantryItem = Partial<InsertPantryItem>;
export type UpdateRecipe = Partial<InsertRecipe>;
export type UpdateMealPlanEntry = Partial<InsertMealPlanEntry>;
export type UpdateGroceryListItem = Partial<InsertGroceryListItem>;
