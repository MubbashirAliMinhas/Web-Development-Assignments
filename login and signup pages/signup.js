const range = document.querySelector('.form-range')
const rangeProgress = document.querySelector('.form-range-progress')

range.addEventListener('input', () => {
    rangeProgress.style.width = range.value / 10 + '%'
})
