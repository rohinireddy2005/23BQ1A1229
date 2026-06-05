export const logger = (
  stack,
  level,
  packageName,
  message
) => {
  console.log({
    stack,
    level,
    packageName,
    message,
    timestamp: new Date().toISOString(),
  });
};