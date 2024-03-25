import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function LoadingButton({ name, loadingText, onClick }) {
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick(); // Call the provided onClick function
      setLoading(false); // Set isLoading back to false after onClick function is executed
    } catch (error) {
      // Handle any errors
      console.error(error);
      setLoading(false); // Set isLoading back to false in case of error
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      size="md"
      bsPrefix ='btn'
      className="custom-Btn w-100"
    >
      {isLoading ? loadingText : name}
    </Button>
  );
}

export default LoadingButton;
