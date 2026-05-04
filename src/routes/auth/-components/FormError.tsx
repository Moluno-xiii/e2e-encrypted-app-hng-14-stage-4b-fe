const FormError = ({ error }: { error: string | null }) => {
  if (!error) return null;
  return <span className="text-xs text-red-600">{error}</span>;
};

export default FormError;
