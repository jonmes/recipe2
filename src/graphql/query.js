import gql from 'graphql-tag'

export const get_all_recipe = {
    query: gql`
        query MyQuery {
            recipe {
                id
                title
                image
            }
        }
    `,
}

export const get_user_data = {
    query: gql`
        query ($user_id: String!) {
            users_by_pk(id: $user_id) {
                name
                avatar
            }
        }
    `,
}