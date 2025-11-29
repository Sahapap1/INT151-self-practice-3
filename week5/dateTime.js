const today1 = new Date()
const today2 = new Date(Date.now())
console.log(today1);
console.log(today2);



const now2 = Date.now()
console.log(now2);

const dateFromString3 = new Date('2025-12-09T10:25:00.100+07:00')
console.log(dateFromString3);


const myDate = new Date()
console.log(myDate.getFullYear())


console.log(today1 === today2)
console.log(today1.getTime() === today2.getTime())

const utcTime = dateFromString3.toISOString()
console.log(utcTime);

console.log(today1.toDateString())

const day1 = new Date('2025-12-30T15:50:45')
console.log(day1.toLocaleString('th-TH'));
console.log(day1.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }));
console.log(day1.toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }));
console.log(day1.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
console.log(day1.toLocaleString('th-TH', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
 }));

const date = new Date('2025-11-02T07:00:00Z')
const formatter = new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Bangkok'
})
console.log(formatter.format(date));


const systemOptions = new Intl.DateTimeFormat().resolvedOptions()
console.log(systemOptions.timeZone);
console.log(systemOptions.locale);



const closeTime = new Date('2025-11-01T00:00:00')
const bookingTime = new Date('2025-11-01T00:00:01')
console.log(bookingTime > closeTime);
console.log(bookingTime.getTime() === closeTime.getTime())


const aStart = new Date('2025-11-01T00:00:00')
const aEnd = new Date('2025-11-05T00:00:00')
const bStart = new Date('2025-11-02T00:00:00')
const bEnd = new Date('2025-11-04T00:00:00')

console.log(bStart <= aEnd);
console.log(bEnd >= aStart);


function isOverlapping(startA, endA, startB, endB) {
    return startB <= endA && endB >= startA
}

console.log(isOverlapping(aStart, aEnd, bStart, bEnd));


function differenceInDays(d1, d2) {
  const a = new Date(d1);
  const b = new Date(d2);

  const diff = Math.abs(b - a); 
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

console.log(differenceInDays("2025-01-01", "2025-02-15"))