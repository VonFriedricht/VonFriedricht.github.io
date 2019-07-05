/**
 * provides a delayed resolve
 * @param {number} time - time in ms in which the resolve should be triggered
 */
export async function sleep(time: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(function() {
      res()
    }, time)
  })
}
