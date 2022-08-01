declare global {
  interface String {
    extractBearerToken: () => string;
  }
}

String.prototype.extractBearerToken = function () {
  return (this as string).split("Bearer ")[1];
};

export {};
