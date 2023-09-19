import { useMutation } from 'react-query';

const fetchCreate = async (): Promise<{
  success: boolean;
  roomCode: string;
}> => {
  return fetch(`http://localhost:3000/api/create`, { method: 'POST' }).then(
    (response) => response.json(),
  );
};

const useCreate = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      return fetchCreate();
    },
  });

  return mutation;
};

export default useCreate;
