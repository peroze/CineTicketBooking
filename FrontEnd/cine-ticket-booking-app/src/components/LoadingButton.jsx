import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function LoadingButton({ name, loadingText, onClick }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    setLoading(true);
    onClick(); // Call the provided onClick function
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
