// import { useRef } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const getAxiosClient = async () => {
//   // Return your configured axios instance
//   return axios;
// };

// export default function Todos() {
//   const modalRef = useRef();
//   const queryClient = useQueryClient();

//   const { mutate: createNewTodo } = useMutation({
//     // The key used to identify this mutation in React Query's cache
//     mutationKey: ['newTodo'],

//     // The function that performs the mutation (i.e., creating a new to-do)
//     mutationFn: async newTodo => {
//       const axiosInstance = await getAxiosClient();

//       // Use the Axios instance to make a POST request to the server, sending the new to-do data
//       const { data } = await axiosInstance.post(
//         'http://localhost:8080/todos',
//         newTodo
//       );

//       // Return the response data (e.g., the newly created to-do object)
//       return data;
//     },
//     onSuccess: () => {
//       // This will be added later
//       queryClient.invalidateQueries('todos');
//     },
//   });

//   // Add mutation for marking todos as completed
//   const { mutate: markAsCompleted } = useMutation({
//     mutationKey: ['markCompleted'],
//     mutationFn: async todoId => {
//       const axiosInstance = await getAxiosClient();
//       const { data } = await axiosInstance.patch(
//         `http://localhost:8080/todos/${todoId}/complete`
//       );
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['todos'] });
//     },
//   });

//   const { data, isError, isLoading } = useQuery({
//     // A unique key to identify this query in React Query's cache
//     queryKey: ['todos'],

//     // The function responsible for fetching the data
//     queryFn: async () => {
//       const axiosInstance = await getAxiosClient();

//       // Use the Axios instance to send a GET request to fetch the list of todos
//       const { data } = await axiosInstance.get('http://localhost:8080/todos');

//       // Return the fetched data (React Query will cache it under the queryKey)
//       return data;
//     },
//   });

//   const toggleNewTodoModal = () => {
//     // Check if the modal is currently open by accessing the `open` property of `modalRef`.
//     if (modalRef.current?.open) {
//       // If the modal is open, close it by calling the `close()` method.
//       modalRef.current.close();
//     } else {
//       // If the modal is not open, open it by calling the `showModal()` method.
//       modalRef.current?.showModal();
//     }
//   };

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       name: '',
//       description: '',
//     },
//   });

//   const handleNewTodo = values => {
//     createNewTodo(values);
//     reset(); // Reset form after submission
//     toggleNewTodoModal();
//     console.log(values);
//   };

//   const NewTodoButton = () => {
//     return (
//       <button className="btn btn-primary" onClick={() => toggleNewTodoModal()}>
//         New Todo
//       </button>
//     );
//   };

//   function TodoModal() {
//     return (
//       // JSX button above
//       <dialog ref={modalRef} className="modal">
//         {/* Rest of JSX */}
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">New Todo</h3>
//           <form onSubmit={handleSubmit(handleNewTodo)}>
//             <label className="form-control w-full">
//               <div className="label">
//                 <span className="label-text">Name of Todo</span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type here"
//                 className="input input-bordered w-full"
//                 {...register('name', { required: true })}
//               />
//             </label>
//             <label className="form-control w-full">
//               <div className="label">
//                 <span className="label-text">Description</span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type here"
//                 className="input input-bordered w-full"
//                 {...register('description')}
//               />
//             </label>
//             <div className="modal-action">
//               <button type="submit" className="btn btn-primary">
//                 Create Todo
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-ghost"
//                 onClick={toggleNewTodoModal}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </dialog>
//     );
//   }

//   const TodoItemList = () => {
//     // Add safety checks for data
//     if (!data?.success || !data?.todos?.length) {
//       return <div>No todos found</div>;
//     }

//     return (
//       <div className="w-lg h-sm flex flex-col items-center justify-center gap-4">
//         <ul className="flex flex-col items-center justify-center gap-4">
//           {data.todos.map(todo => (
//             <li key={todo.id} className="inline-flex items-center gap-4">
//               <div className="w-md">
//                 <h3 className="text-lg">{todo.name}</h3>
//                 <p className="text-sm">{todo.description}</p>
//               </div>
//               <div className="w-md">
//                 <label className="swap">
//                   <input
//                     type="checkbox"
//                     checked={todo.completed || false}
//                     onChange={() => markAsCompleted(todo.id)}
//                   />
//                   <div className="swap-on">Yes</div>
//                   <div className="swap-off">No</div>
//                 </label>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   if (isLoading) {
//     return <div>Loading Todos...</div>;
//   }

//   if (isError) {
//     return <div>There was an error</div>;
//   }

//   return (
//     <>
//       <NewTodoButton />
//       <TodoItemList />
//       <TodoModal />
//     </>
//   );
// }

import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import getAxiosClient from '../axios-instance';
import axios from 'axios';

export default function Todos() {
  const modalRef = useRef();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.get('http://localhost:8080/todos');
      return data; // Correctly return only the data
    },
    // The onSuccess callback in `useQuery` is redundant; mutations should trigger invalidations.
  });

  const { mutate: createNewTodo } = useMutation({
    mutationKey: ['newTodo'],
    mutationFn: async newTodo => {
      const axiosInstance = await getAxiosClient();

      const { data } = await axiosInstance.post(
        'http://localhost:8080/todos',
        newTodo
      );

      return data;
    },
    onSuccess: () => {
      // Invalidate the query to refetch the data after a successful mutation
      queryClient.invalidateQueries('todos');
      // Close the modal and reset the form
      toggleNewTodoModal();
      reset();
    },
  });

  const { mutate: markAsCompleted } = useMutation({
    mutationKey: ['markAsCompleted'],
    mutationFn: async todoId => {
      const axiosInstance = await getAxiosClient();

      const { data } = await axiosInstance.patch(
        `http://localhost:8080/todos/${todoId}/completed`
      );

      return data;
    },
    onSuccess: () => {
      // Invalidate the query to refetch the data after a successful patch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) {
    return <div className="">Loading Todos...</div>;
  }

  if (isError) {
    return <div className="">There was an error</div>;
  }

  const toggleNewTodoModal = () => {
    if (modalRef.current?.open) {
      modalRef.current.close();
    } else {
      modalRef.current?.showModal();
    }
  };

  const handleNewTodo = values => {
    createNewTodo(values);
    // Modal closing and reset are now handled in the mutation's onSuccess
  };

  function NewTodoButton() {
    return (
      <button className="btn btn-primary" onClick={toggleNewTodoModal}>
        New Todo
      </button>
    );
  }

  function TodoModal() {
    return (
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Todo</h3>
          <form onSubmit={handleSubmit(handleNewTodo)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name of Todo</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register('name')}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register('description')}
              />
            </label>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Create Todo
              </button>
              <button
                type="button"
                onClick={() => toggleNewTodoModal()}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }

  function TodoItemList() {
    // Add safety checks for data and its properties.
    // The backend response format seems to be an object with a `todos` property,
    // so `data` should be checked first, and then `data.todos`.
    if (!data?.todos?.length) {
      return <div>No todos found</div>;
    }

    return (
      <div className="w-lg h-sm flex flex-col items-center justify-center gap-4">
        <ul className="flex flex-col items-center justify-center gap-4">
          {data.todos.map(todo => (
            <li key={todo.id} className="inline-flex items-center gap-4">
              <div className="w-md">
                <h3 className="text-lg">{todo.name}</h3>
                <p className="text-sm">{todo.description}</p>
              </div>
              <div className="w-md">
                <label className="swap">
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => markAsCompleted(todo.id)}
                  />
                  <div className="swap-on">Yes</div>
                  <div className="swap-off">No</div>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <NewTodoButton />
      <TodoItemList />
      <TodoModal />
    </>
  );
}
