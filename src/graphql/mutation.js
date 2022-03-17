import gql from 'graphql-tag'

export const update_profile = {
    mutations: gql`
        mutation (
            $user_id: String!
            $avatar: String
            $email: String
            $name: String
            $bio: String
        ) {
            update_user_by_pk(
                pk_columns: { id: $user_id }
                _set: { name: $name, email: $email, bio: $bio, avatar: $avatar }
            ) {
                email
                bio
                name
            }
        }
    `,
}

export const profile_upload = {
    mutations: gql`
        mutation ($name: String!, $type: String!, $base64str: String!) {
            profile_upload(name: $name, type: $type, base64str: $base64str) {
                imageUrl
            }
        }
    `,
}
