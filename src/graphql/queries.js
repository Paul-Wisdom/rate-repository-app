import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
    query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after){
            edges{
                node{
                    ...RepositoryDetails
                },
                cursor
            }
                pageInfo{
                    hasNextPage
                    endCursor
                }
        }
    }
    ${REPOSITORY_DETAILS}
`

export const ME = gql`
    query loggedInUser($includeReviews: Boolean = false){
        me{
            username
            id
            reviews @include(if: $includeReviews){
                edges{
                    node{
                        id
                        rating
                        createdAt
                        text
                        repository{
                            ownerName
                            name
                            id
                        } 
                    }
                }
            }
        }
    }
`

export const GET_REPOSITORY = gql`
    query($repositoryId: ID!, $first: Int, $after: String){
        repository(id: $repositoryId) {
        ...RepositoryDetails
        url
        reviews(first: $first, after: $after){
            edges{
                node{
                    id
                    rating
                    createdAt
                    text
                    user{
                        id
                        username
                    }
                }
            }
            pageInfo{
                hasNextPage
                endCursor
            }
        }
    }
    }
    ${REPOSITORY_DETAILS}
`