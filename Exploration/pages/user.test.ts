// import { render, screen } from '@testing-library/react';
// import UsersPage, { getServerSideProps } from './UsersPage';

// describe('UsersPage', () => {
//     const mockUsers = [
//         { id: 1, name: 'John Doe', email: 'john@example.com' },
//         { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//     ];

//     it('renders the users list', () => {
//         render(<UsersPage users={mockUsers} />);
        
//         expect(screen.getByText('Users List')).toBeInTheDocument();
//         expect(screen.getByText('Name: John Doe, Email: john@example.com')).toBeInTheDocument();
//         expect(screen.getByText('Name: Jane Smith, Email: jane@example.com')).toBeInTheDocument();
//     });

//     it('renders an empty list when no users are provided', () => {
//         render(<UsersPage users={[]} />);
        
//         expect(screen.getByText('Users List')).toBeInTheDocument();
//         expect(screen.queryByText(/Name:/)).not.toBeInTheDocument();
//     });
// });

// describe('getServerSideProps', () => {
//     it('fetches users from the API and returns them as props', async () => {
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 json: () => Promise.resolve(mockUsers),
//             })
//         ) as jest.Mock;

//         const result = await getServerSideProps();

//         expect(result).toEqual({
//             props: {
//                 users: mockUsers,
//             },
//         });
//     });

//     it('handles fetch failure gracefully', async () => {
//         global.fetch = jest.fn(() => Promise.reject('API is down')) as jest.Mock;

//         const result = await getServerSideProps();

//         expect(result).toEqual({
//             props: {
//                 users: [], // or handle it as necessary
//             },
//         });
//     });
// });