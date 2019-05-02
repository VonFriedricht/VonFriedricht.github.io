export async function sleep(time: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(function() {
      res();
    }, time);
  });
}
