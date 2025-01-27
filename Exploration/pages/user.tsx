import React from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type UsersPageProps = {
    users: User[];
};

export default function UsersPage({ users }: UsersPageProps) {
    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Name: {user.name}, Email: {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// getServerSideProps for server-side data fetching
export async function getServerSideProps() {
  const response = await fetch('https://mocki.io/v1/a436d373-c56c-492c-b5f6-580498216279');
  const data: User[] = await response.json();

  return {
    props: {
      users: data, // Pass fetched data as props
    },
  };
}
