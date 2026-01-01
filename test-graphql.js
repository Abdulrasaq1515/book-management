// Simple test to check if GraphQL endpoint works
const query = `
  query {
    books {
      id
      title
      author
      description
      status
      createdAt
      updatedAt
    }
  }
`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query })
})
.then(response => response.json())
.then(data => {
  console.log('GraphQL Response:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error:', error);
});