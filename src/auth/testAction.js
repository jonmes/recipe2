input InsertRecipeOneDerivedImagesInsertInput {
    id: Int
    recipe: InsertRecipeOneDerivedRecipeObjRelInsertInput
    recipe_id: Int
    url: String
  }
  
  input InsertRecipeOneDerivedRecipeObjRelInsertInput {
    data: InsertRecipeOneDerivedRecipeInsertInput!
    on_conflict: InsertRecipeOneDerivedRecipeOnConflict
  }
  
  input InsertRecipeOneDerivedRecipeInsertInput {
    avg_rating: Float
    calories: Int
    category: String
    created_at: timestamptz
    description: String
    id: Int
    images: InsertRecipeOneDerivedImagesArrRelInsertInput
    ingredients: InsertRecipeOneDerivedIngredientArrRelInsertInput
    prep_time: Int
    ratings: Int
    serving: Int
    steps: InsertRecipeOneDerivedStepsArrRelInsertInput
    title: String
    user_id: String
  }
  
  input InsertRecipeOneDerivedImagesArrRelInsertInput {
    data: [InsertRecipeOneDerivedImagesInsertInput!]!
    on_conflict: InsertRecipeOneDerivedImagesOnConflict
  }
  
  input InsertRecipeOneDerivedImagesOnConflict {
    constraint: InsertRecipeOneDerivedImagesConstraint!
    update_columns: [InsertRecipeOneDerivedImagesUpdateColumn!]!
    where: InsertRecipeOneDerivedImagesBoolExp
  }
  
  enum InsertRecipeOneDerivedImagesConstraint {
    """ unique or primary key constraint """ images_pkey
  }
  
  enum InsertRecipeOneDerivedImagesUpdateColumn {
    """ column name """ id
    """ column name """ recipe_id
    """ column name """ url
  }
  
  input InsertRecipeOneDerivedImagesBoolExp {
    _and: [InsertRecipeOneDerivedImagesBoolExp!]
    _not: InsertRecipeOneDerivedImagesBoolExp
    _or: [InsertRecipeOneDerivedImagesBoolExp!]
    id: InsertRecipeOneDerivedIntComparisonExp
    recipe: InsertRecipeOneDerivedRecipeBoolExp
    recipe_id: InsertRecipeOneDerivedIntComparisonExp
    url: InsertRecipeOneDerivedStringComparisonExp
  }
  
  input InsertRecipeOneDerivedIntComparisonExp {
    _eq: Int
    _gt: Int
    _gte: Int
    _in: [Int!]
    _is_null: Boolean
    _lt: Int
    _lte: Int
    _neq: Int
    _nin: [Int!]
  }
  
  input InsertRecipeOneDerivedRecipeBoolExp {
    _and: [InsertRecipeOneDerivedRecipeBoolExp!]
    _not: InsertRecipeOneDerivedRecipeBoolExp
    _or: [InsertRecipeOneDerivedRecipeBoolExp!]
    avg_rating: InsertRecipeOneDerivedFloatComparisonExp
    calories: InsertRecipeOneDerivedIntComparisonExp
    category: InsertRecipeOneDerivedStringComparisonExp
    created_at: InsertRecipeOneDerivedTimestamptzComparisonExp
    description: InsertRecipeOneDerivedStringComparisonExp
    id: InsertRecipeOneDerivedIntComparisonExp
    images: InsertRecipeOneDerivedImagesBoolExp
    ingredients: InsertRecipeOneDerivedIngredientBoolExp
    prep_time: InsertRecipeOneDerivedIntComparisonExp
    ratings: InsertRecipeOneDerivedIntComparisonExp
    serving: InsertRecipeOneDerivedIntComparisonExp
    steps: InsertRecipeOneDerivedStepsBoolExp
    title: InsertRecipeOneDerivedStringComparisonExp
    user_id: InsertRecipeOneDerivedStringComparisonExp
  }
  
  input InsertRecipeOneDerivedFloatComparisonExp {
    _eq: Float
    _gt: Float
    _gte: Float
    _in: [Float!]
    _is_null: Boolean
    _lt: Float
    _lte: Float
    _neq: Float
    _nin: [Float!]
  }
  
  input InsertRecipeOneDerivedStringComparisonExp {
    _eq: String
    _gt: String
    _gte: String
    _ilike: String
    _in: [String!]
    _iregex: String
    _is_null: Boolean
    _like: String
    _lt: String
    _lte: String
    _neq: String
    _nilike: String
    _nin: [String!]
    _niregex: String
    _nlike: String
    _nregex: String
    _nsimilar: String
    _regex: String
    _similar: String
  }
  
  input InsertRecipeOneDerivedTimestamptzComparisonExp {
    _eq: timestamptz
    _gt: timestamptz
    _gte: timestamptz
    _in: [timestamptz!]
    _is_null: Boolean
    _lt: timestamptz
    _lte: timestamptz
    _neq: timestamptz
    _nin: [timestamptz!]
  }
  
  input InsertRecipeOneDerivedIngredientBoolExp {
    _and: [InsertRecipeOneDerivedIngredientBoolExp!]
    _not: InsertRecipeOneDerivedIngredientBoolExp
    _or: [InsertRecipeOneDerivedIngredientBoolExp!]
    amount: InsertRecipeOneDerivedStringComparisonExp
    id: InsertRecipeOneDerivedIntComparisonExp
    name: InsertRecipeOneDerivedStringComparisonExp
    recipe: InsertRecipeOneDerivedRecipeBoolExp
    recipe_id: InsertRecipeOneDerivedIntComparisonExp
  }
  
  input InsertRecipeOneDerivedStepsBoolExp {
    _and: [InsertRecipeOneDerivedStepsBoolExp!]
    _not: InsertRecipeOneDerivedStepsBoolExp
    _or: [InsertRecipeOneDerivedStepsBoolExp!]
    id: InsertRecipeOneDerivedIntComparisonExp
    recipe: InsertRecipeOneDerivedRecipeBoolExp
    recipe_id: InsertRecipeOneDerivedIntComparisonExp
    step: InsertRecipeOneDerivedStringComparisonExp
  }
  
  input InsertRecipeOneDerivedIngredientArrRelInsertInput {
    data: [InsertRecipeOneDerivedIngredientInsertInput!]!
    on_conflict: InsertRecipeOneDerivedIngredientOnConflict
  }
  
  input InsertRecipeOneDerivedIngredientInsertInput {
    amount: String
    id: Int
    name: String
    recipe: InsertRecipeOneDerivedRecipeObjRelInsertInput
    recipe_id: Int
  }
  
  input InsertRecipeOneDerivedIngredientOnConflict {
    constraint: InsertRecipeOneDerivedIngredientConstraint!
    update_columns: [InsertRecipeOneDerivedIngredientUpdateColumn!]!
    where: InsertRecipeOneDerivedIngredientBoolExp
  }
  
  enum InsertRecipeOneDerivedIngredientConstraint {
    """ unique or primary key constraint """ ingredient_pkey
  }
  
  enum InsertRecipeOneDerivedIngredientUpdateColumn {
    """ column name """ amount
    """ column name """ id
    """ column name """ name
    """ column name """ recipe_id
  }
  
  input InsertRecipeOneDerivedStepsArrRelInsertInput {
    data: [InsertRecipeOneDerivedStepsInsertInput!]!
    on_conflict: InsertRecipeOneDerivedStepsOnConflict
  }
  
  input InsertRecipeOneDerivedStepsInsertInput {
    id: Int
    recipe: InsertRecipeOneDerivedRecipeObjRelInsertInput
    recipe_id: Int
    step: String
  }
  
  input InsertRecipeOneDerivedStepsOnConflict {
    constraint: InsertRecipeOneDerivedStepsConstraint!
    update_columns: [InsertRecipeOneDerivedStepsUpdateColumn!]!
    where: InsertRecipeOneDerivedStepsBoolExp
  }
  
  enum InsertRecipeOneDerivedStepsConstraint {
    """ unique or primary key constraint """ steps_pkey
  }
  
  enum InsertRecipeOneDerivedStepsUpdateColumn {
    """ column name """ id
    """ column name """ recipe_id
    """ column name """ step
  }
  
  input InsertRecipeOneDerivedRecipeOnConflict {
    constraint: InsertRecipeOneDerivedRecipeConstraint!
    update_columns: [InsertRecipeOneDerivedRecipeUpdateColumn!]!
    where: InsertRecipeOneDerivedRecipeBoolExp
  }
  
  enum InsertRecipeOneDerivedRecipeConstraint {
    """ unique or primary key constraint """ recipe_pkey
  }
  
  enum InsertRecipeOneDerivedRecipeUpdateColumn {
    """ column name """ avg_rating
    """ column name """ calories
    """ column name """ category
    """ column name """ created_at
    """ column name """ description
    """ column name """ id
    """ column name """ prep_time
    """ column name """ ratings
    """ column name """ serving
    """ column name """ title
    """ column name """ user_id
  }
  
  type InsertRecipeOneDerivedOutput {
    title: String!
  }