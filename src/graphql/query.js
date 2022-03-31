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

export const search_recipe = {
    query: gql`
        query searchQuery(
            $search: String!
            # $pageLimit: Int!
            # $offset: Int!
            $sort: [recipe_order_by!]!
            $timeFilter: [recipe_bool_exp!]!
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
                order_by: $sort # limit: $pageLimit # offset: $offset
            ) {
                id
                title
                category
                prep_time
                calories
                serving
                description
                avg_rating
                ratings {
                    rating_val
                }
                user_id
                created_at
                images {
                    url
                }
                ingredients {
                    name
                    amount
                }
                steps {
                    step
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
                ratings
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
