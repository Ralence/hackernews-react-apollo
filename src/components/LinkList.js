import React, { Component } from 'react';
import Link from './Link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }

        }
    }
`;

class LinkList extends Component {
    _updateCacheAfterVote = (store, createVote, linkId) => {
        const data = store.readQuery({ query: FEED_QUERY })

        const votedLink = data.feed.links.find(link => link.id === linkId)
        votedLink.votes = createVote.link.votes

        store.writeQuery({ query: FEED_QUERY, data })
    }
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error!</p>
                    return (
                        <div>
                            {data.feed.links.map((link, index) => (
                                <Link
                                    key={link.id}
                                    link={link}
                                    index={index}
                                    updateStoreAfterVote={this._updateCacheAfterVote} />
                            ))}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export { FEED_QUERY };
export default LinkList;
