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
