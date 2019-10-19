import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_LINK_MUTATION = gql`
    mutation CREATE_LINK_MUTATION ($url: String!, $description: String!) {
        post(url: $url, description: $description) {
            id
            createdAt
            url
            description
        }
    }
`;

class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    }

    render() {
        const { description, url } = this.state
        return (
            <Mutation mutation={CREATE_LINK_MUTATION} variables={this.state} onCompleted={() => this.props.history.push('/')}>
                {(post, { loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error!</p>
                    return (
                        <div>
                            <div className="flex flex-column mt3">
                                <input
                                    className="mb2"
                                    value={description}
                                    onChange={e => this.setState({ description: e.target.value })}
                                    type="text"
                                    placeholder="A description for the link"
                                />
                                <input
                                    className="mb2"
                                    value={url}
                                    onChange={e => this.setState({ url: e.target.value })}
                                    type="text"
                                    placeholder="The URL for the link"
                                />
                            </div>
                            <button onClick={post}>Submit</button>
                        </div>
                    )
                }}
            </Mutation>

        )
    }
}

export default CreateLink;