export default class RundownToDynamicTableAdapter {
  adapt(rundown) {
    return {
      headers: ['no.', 'category', 'amount spent'],
      body: rundown.reduce((array, entry, index) => {
        array.push([index + 1, entry.id, -entry.amount.toFixed(2)])
        return array;
      }, []),
    }
  }
}