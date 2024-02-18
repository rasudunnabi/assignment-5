function moveToBook() {
  const section = document.getElementById("book-ticket");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

const allSeats = document.getElementsByClassName("seat-btn");
let count = 0;
const cls = "Economny";
const price = 550;

for (const seat of allSeats) {
  seat.addEventListener("click", function (e) {
    count = count + 1;

    seat.classList.add("pointer-events-none");

    if (count === 4) {
      const seatArea = document.getElementById("seat-area");
      seatArea.classList.add("pointer-events-none");
    }

    const seatName = e.target.innerText;
    const seatSelected = e.target.classList.add("bg-[#1DD100]", "text-white");
    const seatContainer = document.getElementById("seat-container");
    const classContainer = document.getElementById("class-container");
    const priceContainer = document.getElementById("price-container");

    const p = document.createElement("p");
    p.innerText = seatName;
    const p2 = document.createElement("p");
    p2.innerText = cls;
    const p3 = document.createElement("p");
    p3.innerText = price;

    seatContainer.appendChild(p);
    classContainer.appendChild(p2);
    priceContainer.appendChild(p3);

    totalCostById("total-price", price);

    grandTotalById();

    setInnerText("ticket-count", count);

    const currentSeatsElement = document.getElementById("current-seats");
    const currentSeatsText = currentSeatsElement.innerText;
    const currentSeats = parseInt(currentSeatsText);
    const newSeats = currentSeats - 1;
    setInnerText("current-seats", newSeats);
  });
}

function totalCostById(id, value) {
  const totalCostText = document.getElementById(id).innerText;
  const totalCost = parseInt(totalCostText);
  const sum = totalCost + value;
  setInnerText(id, sum);
}
function grandTotalById() {
  const totalCostText = document.getElementById("total-price").innerText;
  const totalCost = parseInt(totalCostText);
  setInnerText("grand-total", totalCost);
  if (count === 4) {
    const couponBtn = document.getElementById("coupon-btn");
    couponBtn.removeAttribute("disabled");
  }
}

function couponTotal() {
  const grandTotalText = document.getElementById("grand-total").innerText;
  const grandTotalCost = parseInt(grandTotalText);
  const couponElement = document.getElementById("coupon-field").value;
  const couponCode = couponElement.split(" ").join("").toUpperCase();
  if (count === 4) {
    if (couponCode === "NEW15") {
      const discountedPrice = grandTotalCost * 0.15;
      setInnerText("grand-total", grandTotalCost - discountedPrice);
      const couponCon = document.getElementById("coupon-container");
      couponCon.classList.add("hidden");
      const line = document.getElementById("line");
      line.classList.remove("hidden");
    } else if (couponCode === "COUPLE20") {
      const discountedPrice = grandTotalCost * 0.2;
      setInnerText("grand-total", grandTotalCost - discountedPrice);
    } else {
      alert("Invalid Coupon");
    }
  }
}
