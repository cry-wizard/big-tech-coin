import { toast } from "react-toastify";

export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
  e.preventDefault();

  if (!id) {
    toast.error("Invalid coin ID.");
    return;
  }

  if (!window.confirm("Are you sure you want to remove this coin?")) {
    toast.info(`${capitalizeFirstLetter(id)} - was not removed.`);
    return;
  }

  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const newList = watchlist.filter((coin) => coin !== id);

  if (watchlist.length === newList.length) {
    toast.warning(`${capitalizeFirstLetter(id)} - is not in your watchlist.`);
    return;
  }

  localStorage.setItem("watchlist", JSON.stringify(newList));
  setIsCoinAdded(false);
  toast.success(`${capitalizeFirstLetter(id)} - has been removed!`);
  
  // Avoid full page reload for better user experience
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
