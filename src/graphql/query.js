import gql from 'graphql-tag'

export const get_all_recipe = {
    query: gql`
        query MyQuery {
            recipe {
                id
                title
            }
        }
    `,
}

export const get_user_data = {
    query: gql`
        query ($user_id: String!) {
            user_by_pk(id: $user_id) {
                name
                avatar
                bio
                email
                id
            }
        }
    `,
}

// export const search_recipe = {
//     query: gql`
//         query searchQuery(
//             $search: String!
//             $limit: Int!
//             $offset: Int!
//             $timeFilter: [recipe_bool_exp!]!
//             $sort: [recipe_order_by!]!
//         ) {
//             recipe(
//                 where: {
//                     _and: [
//                         {
//                             _or: [
//                                 { title: { _ilike: $search } }
//                                 { ingredients: { name: { _ilike: $search } } }
//                             ]
//                         }
//                         { _and: $timeFilter }
//                     ]
//                 }
//                 offset: $offset
//                 limit: $limit
//                 order_by: $sort
//             ) {
//                 id
//                 title
//                 category
//                 prep_time
//                 description
//                 avg_rating
//                 ratings {
//                     rating_val
//                 }
//                 images {
//                     url
//                 }
//                 user {
//                     name
//                 }
//             }
//         }
//     `,
// }

export const search_recipe = {
    query: gql`
        query searchQuery(
            $search: String!
            $limit: Int!
            $offset: Int!
            $timeFilter: [recipe_bool_exp!]!
            $sort: [recipe_order_by!]!
        ) {
            recipe(
                where: {
                    _and: [
                        {
                            _or: [
                                { title: { _ilike: $search } }
                                { ingredients: { name: { _ilike: $search } } }
                            ]
                        }
                        { _and: $timeFilter }
                    ]
                }
                offset: $offset
                limit: $limit
                order_by: $sort
            ) {
                id
                title
                category
                prep_time
                description
                avg_rating
                ratings {
                    rating_val
                }
                images {
                    url
                }
                user {
                    name
                }
            }
        }
    `,
}

export const query_all = {
    query: gql`
        query queryAll($id: Int!) {
            recipe_by_pk(id: $id) {
                id
                title
                category
                calories
                description
                serving
                prep_time
                avg_rating
                created_at
                images {
                    url
                }
                ratings {
                    rating_val
                    user_id
                }
                ingredients {
                    amount
                    name
                }
                steps {
                    step
                }
                user {
                    name
                }
                user_id
            }
        }
    `,
}

export const rating_query = {
    query: gql`
        query ratingQuery($user_id: String!, $recipe_id: Int!) {
            rating(
                where: {
                    _and: [
                        { user_id: { _eq: $user_id } }
                        { recipe_id: { _eq: $recipe_id } }
                    ]
                }
            ) {
                rating_val
            }
        }
    `,
}

export const comment_query = {
    query: gql`
        query comment_query($recipe_id: Int!) {
            comment(where: { recipe_id: { _eq: $recipe_id } }) {
                comment
                user {
                    name
                    avatar
                }
            }
        }
    `,
}

export const fav_query = {
    query: gql`
        query ($user_id: String!) {
            favorite(where: { user_id: { _eq: $user_id } }) {
                id
                recipe_id
                recipe {
                    id
                    title
                    description
                    images {
                        url
                    }
                    avg_rating
                    user {
                        name
                    }
                }
            }
        }
    `,
}

export const all_recipe = {
    query: gql`
        query ($where: recipe_bool_exp!, $order: order_by!) {
            recipe(limit: 6, where: $where, order_by: { id: $order }) {
                id
                title
                description
                images {
                    url
                }
                avg_rating
                user {
                    name
                }
            }
        }
    `,
}

export const recipe_by_user = {
    query: gql`
        query ($user_id: String!) {
            recipe(where: { user_id: { _eq: $user_id } }) {
                id
                title
                images {
                    url
                }
                avg_rating
                created_at
            }
        }
    `,
}

// export const sort_user_recipe = {
//     query: gql`
//         query ($user_id: String!, $order: [recipe_order_by!]!, $offset: Int!) {
//             recipe(
//                 where: { user_id: { _eq: $user_id } }
//                 limit: 2
//                 offset: $offset
//                 order_by: $order
//             ) {
//                 id
//                 title
//                 images {
//                     url
//                 }
//                 avg_rating
//                 created_at
//             }
//         }
//     `,
// }

export const sort_user_recipe = {
    query: gql`
        query (
            $user_id: String!
            $recipe_id: Int!
            $order: [recipe_order_by]!
        ) {
            recipe(
                where: {
                    _and: {
                        user_id: { _eq: $user_id }
                        id: { _gt: $recipe_id }
                    }
                }
                limit: 2
                order_by: $order
            ) @connection(key: "recipe") {
                id
                title
                images {
                    url
                }
                avg_rating
                created_at
            }
        }
    `,
}

export const fav_check = {
    query: gql`
        query ($user_id: String!, $recipeId: Int!) {
            favorite(
                where: {
                    _and: {
                        user_id: { _eq: $user_id }
                        recipe_id: { _eq: $recipeId }
                    }
                }
            ) {
                id
                recipe_id
            }
        }
    `,
}

export const fav_count = {
    query: gql`
        query ($recipeId: Int!) {
            favorite_aggregate(where: { recipe_id: { _eq: $recipeId } }) {
                aggregate {
                    count
                }
            }
        }
    `,
}

export const ctg_filter = {
    query: gql`
        query ($ctg: String!) {
            recipe(where: { category: { _ilike: $ctg } }) {
                id
                title
                category
                prep_time
                description
                avg_rating
                ratings {
                    rating_val
                }
                images {
                    url
                }
                user {
                    name
                }
            }
        }
    `,
}
