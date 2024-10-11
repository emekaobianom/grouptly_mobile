


# How to run a livereload on my android
ionic cap run android --livereload --external

# How to run a normal app on my android
ionic cap run android --external

# How to get .apk file 
cd android

Then, run the following Gradle command to build the APK:

If you need a debug build, use:

./gradlew assembleDebug

If you need a release build, use:

./gradlew assembleRelease


# ======== ionic react life cycle =========


# ============== USE EFFECT ======================

1. Component Mounting
# This effect runs once when the component mounts
  useEffect(() => {
    console.log('Component mounted');
    
    // Simulate data fetching
    fetchData();

    // Clean up function if necessary (like removing listeners)
    return () => {
      console.log('Component unmounting');
    };
  }, []);


2. Component Updating
# This effect runs when `count` changes
  useEffect(() => {
    console.log(`Count has updated to: ${count}`);
  }, [count]);


3. Component Unmounting
# This happens when the component is removed from the DOM
 useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      console.log('Timer stopped');
    };
  }, []);


4. Handling Route Changes in Ionic React
# Detecting route change
const location = useLocation();

  // Run side effect when the route changes
  useEffect(() => {
    console.log(`Route changed to: ${location.pathname}`);
  }, [location]);