function calculateQuote() {
  const size = parseInt(document.getElementById('size').value);
  const conservatory = parseInt(document.getElementById('conservatory').value);

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}
