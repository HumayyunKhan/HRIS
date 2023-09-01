import { SuccessResponseDto } from '../dtos';

export const constructSuccessResponse = <T>(data: T, message?: string): SuccessResponseDto<T> => {
  const response = {
    message: message || 'OK_MESSAGE',
    data: data,
    success: true,
  };

  return response;
};
