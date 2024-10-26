import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Index = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const orderId = localStorage.getItem("orderid");
    console.log(orderId);
    
    if (orderId) {
      const verifyOrder = async () => {
        try {
          const response = await fetch(`https://api.resumeintellect.com/api/user/paypal/verify-order?orderid=${orderId}`);
          if (!response.ok) {
            throw new Error("Payment Failed: Try again");
          }
          const data = await response.json();
          setVerificationResult(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      verifyOrder(); // Call the verifyOrder function
    } else {
      setLoading(false); // If no order ID is found, stop loading
      setError("No order ID found in local storage.");
    }
  }, []); // Dependency array is empty to run effect only once on mount

  const handleRedirect = () => {
    router.push('/dashboard/aibuilder'); // Redirect to /dashboard/aibuilder
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="bg-red-100 h-screen text-3xl text-center content-center font-semibold ">
      {error}
      <button onClick={handleRedirect} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Go to AI Builder
      </button>
    </div>
  );

  return (
    <>
      <h1>Order Verification</h1>
      {verificationResult ? (
        <div>
          <h2>Verification Result:</h2>
          <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
        </div>
      ) : (
        <div>No verification result available.</div>
      )}
      <button onClick={handleRedirect} className="mt-4 bg-blue-900 text-white px-4 py-2 rounded">
        Go to AI Builder
      </button>
    </>
  );
};

export default Index;
