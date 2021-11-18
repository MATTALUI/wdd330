(async () => {
  document.querySelector('form').addEventListener('change', getDataForInputs);

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  document.querySelector('input[name="starttime"]').value = startDate.toISOString().substring(0, 10);
  document.querySelector('input[name="endtime"]').value = new Date().toISOString().substring(0, 10);

  getDataForInputs();
})();
