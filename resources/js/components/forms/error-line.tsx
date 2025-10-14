const ErrorLine = ({ field }: { field: string }) =>
  <div className='text-red-600 italic'>
    *{field}
  </div>

export default ErrorLine