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
            }

        }
    }
`;

class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error!</p>
                    return (<div>
                        {data.feed.links.map(link => <Link key={link.id} link={link} />)}
                    </div>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList;
