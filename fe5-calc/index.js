const $ = document.querySelectorAll.bind(document)
$('#result')[0].value = ''
// 可以用es5的class
function Calc () {
    let value = ''
    Object.defineProperty(this, 'value', {
        set (val) {
            console.log('set', val);
            value = val
            $('#result')[0].value = val
        },
        get () {
            return value
        }
    })
        this.remove = () => {
            this.value = this.value.toString().substring(0, this.value.length - 1)
        },
        this.clear = () => {
            this.value = ''
            $('#result')[0].disabled = false
        },
        this.append = (ch) => {
            this.value += ch
        },
        this.toggleSign = () => {
            if (this.value[0] === '-') {
                this.value = this.value.toString().substring(1, this.value.length)
            } else {
                this.value = '-' + this.value
            }
        },
        this.compute = () => {
            try {
                this.value = eval(this.value)
                if (isNaN(this.value)) {
                    $('#result')[0].disabled = true
                }
            } catch {
                $('#result')[0].disabled = true
                $('#result')[0].value = '[syntax error]'
            }
        },
        this.sqrt = () => {
            try {
                this.value = Math.sqrt(eval(this.value))
            } catch {
                $('#result')[0].disabled = true
                $('#result')[0].value = '[syntax error]'
            } 
        },
        this.reciprocal = () => {
            try {
                this.value = 1 / eval(this.value)
            } catch {
                $('#result')[0].disabled = true
                $('#result')[0].value = '[syntax error]'
            } 
        }
} 

$('#result')[0].addEventListener('keyup', function () {
    calc.value = this.value
})

const calc = new Calc()

$('#backspace')[0].addEventListener('click', calc.remove)
$('#CE')[0].addEventListener('click', calc.clear)
$('#C')[0].addEventListener('click', calc.clear)

$('#add')[0].addEventListener('click', () => calc.append('+'))
$('#sub')[0].addEventListener('click', () => calc.append('-'))
$('#mul')[0].addEventListener('click', () => calc.append('*'))
$('#div')[0].addEventListener('click', () => calc.append('/'))

$('.num').forEach(item => {
    item.addEventListener('click', () => calc.append(item.value.trim()))
})

$('#sign')[0].addEventListener('click', calc.toggleSign)
$('#point')[0].addEventListener('click', () => calc.append('.'))
$('#mod')[0].addEventListener('click', () => calc.append('%'))
$('#sqrt')[0].addEventListener('click', calc.sqrt)
$('#recip')[0].addEventListener('click', calc.reciprocal)


$('#calculate')[0].addEventListener('click', calc.compute)