const DATE_FORMATTER = new Intl.DateTimeFormat('id', {
  hour12: true,
  dateStyle: 'medium',
});

function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}

export default formatDate;
