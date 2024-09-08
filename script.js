

let currentStep = 1;
let selectedCollege = '';
let fallTotal = 0;
let winterTotal = 0;
let springTotal = 0;
let isCaliforniaResident = true; // Assume true until user selects
let selectedDiningPlan = '';
let selectedRoomType = '';  // Store selected room type
let selectedLivingStatus = ''; // Store the selected living status
let livingStatus = null;
let selectedResidenceType = '';
let selectedResidencyStatus = null;
let healthWaiverElement = null;
let selectedEntranceYear = null;
let isFirstYear = null; // Store whether the student is a first-year
disableAllSidebarItems();

function disableAllSidebarItems() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.style.pointerEvents = 'none'; // Disable clicking
    });
}

function enableAllSidebarItems() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.style.pointerEvents = ''; // Enable clicking (restore default)
    });
}

function disableOffCampusSteps() {
    const residenceType = document.querySelector('.sidebar-item-residence');
    const roomType = document.querySelector('.sidebar-item-room');
    
    if (residenceType) {
        residenceType.style.pointerEvents = 'none'; // Disable click
        residenceType.style.opacity = '0.5'; // Grey them out visually
    }
    if (roomType) {
        roomType.style.pointerEvents = 'none'; // Disable click
        roomType.style.opacity = '0.5'; // Grey them out visually
    }
}

function enableOffCampusSteps() {
    const residenceType = document.querySelector('.sidebar-item-residence');
    const roomType = document.querySelector('.sidebar-item-room');
    
    if (residenceType) {
        residenceType.style.pointerEvents = ''; // Enable click
        residenceType.style.opacity = ''; // Restore original appearance
    }
    if (roomType) {
        roomType.style.pointerEvents = ''; // Enable click
        roomType.style.opacity = ''; // Restore original appearance
    }
}





function selectFirstYear(status) {
    isFirstYear = status === 'yes';  // Store the selection
    console.log("Is First Year Student:", isFirstYear);

    // Update buttons appearance for selection
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`button[onclick="selectFirstYear('${status}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}


function selectEntranceYear(year) {
    selectedEntranceYear = year;  // Store the selected year
    console.log("Selected Entrance Year:", selectedEntranceYear);

    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`button[onclick="selectEntranceYear(${year})"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}


function selectHealthWaiver(option) {
    healthWaiverElement = option; // Set the selected option (yes or no)
    console.log("Selected Health Waiver:", healthWaiverElement);

    // Visual feedback for button selection
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`button[onclick="selectHealthWaiver('${option}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}




function selectResidencyStatus(status) {
    selectedResidencyStatus = status;
    console.log("Selected Residency Status:", selectedResidencyStatus);

    // Visual feedback for the button selection
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`button[onclick="selectResidencyStatus('${status}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}



function selectResidenceType(type) {
    if (type === "Residence Hall") {
        selectedResidenceType = "RH";  // Map to the correct key
    } else if (type === "Apartment") {
        selectedResidenceType = "Apt";  // Map to the correct key
    }
    console.log("Selected Residence Type:", selectedResidenceType);

    // Update buttons appearance for selection
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`button[onclick="selectResidenceType('${type}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}


function selectLivingStatus(status) {
    livingStatus = status;
    console.log("Selected Living Status:", livingStatus);

    // Update buttons appearance for selection
    const buttons = document.querySelectorAll('.living-status button');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`button[onclick="selectLivingStatus('${status}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }

    // Disable Residence Type and Room Type for Off-Campus, enable them for On-Campus
    if (livingStatus === 'off') {
        disableOffCampusSteps();
    } else {
        enableOffCampusSteps();
    }

    updateSidebarState(); // Call your function to update the sidebar
}





// Modify the nextStep function to check for living status
function nextStep() {
    if (!livingStatus) {
        alert("Please select your living status.");
        return;
    }

    const isOffCampus = livingStatus === 'off';

    if (isOffCampus && currentStep === 1) {
        currentStep = 5; // Skip to Dining Plan if Off-Campus
    } else if (currentStep < 12) {
        currentStep++;
    }

    // Ensure residence and room type are skipped for Off-Campus users
    if (isOffCampus && (currentStep === 3 || currentStep === 4)) {
        currentStep = 5; // Skip Residence and Room Type
        
    }

    showStep(currentStep);
}

function selectRoomType(roomType) {
    selectedRoomType = roomType;  // Capture the room type selection
    console.log("Selected Room Type:", selectedRoomType);

    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`button[onclick="selectRoomType('${roomType}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}



function selectDiningPlan(plan) {
    selectedDiningPlan = plan;  // Store the selected plan
    console.log("Selected Dining Plan:", selectedDiningPlan);

    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`button[onclick="selectDiningPlan('${plan}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}

let hasPaidDeposit = false;

// Function to handle deposit status selection
function selectDepositStatus(status) {
    hasPaidDeposit = (status === 'yes');
    console.log("Has Paid Deposit:", hasPaidDeposit);

    // Clear 'selected' class from both buttons
    const buttons = document.querySelectorAll('.deposit-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`button[onclick="selectDepositStatus('${status}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}



function showStep(step, isFromSidebar = false) {
    const steps = document.querySelectorAll(".step");
    const isOffCampus = livingStatus === 'off';  // Check if the user selected off-campus

    // Hide all steps
    steps.forEach(stepDiv => stepDiv.classList.remove('active'));

    // Skip Residence Type (step 3) and Room Type (step 4) if living off-campus
    if (!isFromSidebar && isOffCampus && (step === 3 || step === 4)) {
        step = 5; // Skip to Dining Plan (step 5) for off-campus students
    }

    // Debugging: Log the step to see which one is being activated
    console.log(`Trying to show step: step${step}`);

    // Make sure the element exists before manipulating classList
    const stepDiv = document.getElementById("step" + step);
    if (stepDiv) {
        stepDiv.classList.add('active'); // Add 'active' class to the step
        currentStep = step; // Update currentStep to the clicked step
    } else {
        console.error(`Step ${step} does not exist. Make sure the element is present in the HTML.`);
    }

    // Update the sidebar to highlight the current step
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('selected')); // Remove previous highlights

    // Adjust index for correct sidebar highlighting
    const sidebarIndex = step - 2;
    if (sidebarItems[sidebarIndex]) {
        sidebarItems[sidebarIndex].classList.add('selected');  // Highlight the current step
    }
}



// Disable Residence and Room Type in sidebar when Off-Campus is selected
function handleSidebarClick(step) {
    if (!livingStatus) {
        alert("Please select your living status.");
        return;
    }

    const isOffCampus = livingStatus === 'off';

    // Prevent navigation to Residence Type and Room Type if Off-Campus
    if (isOffCampus && (step === 3 || step === 4)) {
        console.log("Sidebar click prevented for Room Type and Residence Type on Off-Campus selection");
        return; // Do nothing if Off-Campus is selected and trying to access these steps
    }

    let stepToShow = stepIndex + 2;  // Adjust if your sidebar index starts from 0 but step starts from 1
    showStep(stepToShow, true);  // Call showStep with the corrected step
}



// Automatically show the first step when the page loads
document.addEventListener('DOMContentLoaded', function () {
    showStep(1); // Show the first step by default
});


// Automatically show the first step when the page loads
document.addEventListener('DOMContentLoaded', function () {
    showStep(1); // Show the first step by default
});



// Modify the prevStep function to skip Residence and Room Type if Off-Campus is selected
function prevStep() {
    const isOffCampus = livingStatus === 'off';

    if (currentStep > 1) {
        currentStep--;

        // Ensure residence and room type are skipped for Off-Campus users
        if (isOffCampus && (currentStep === 3 || currentStep === 4)) {
            currentStep = 1; // Skip Residence and Room Type, go back to Living Status
        }
    }

    showStep(currentStep); // Show the appropriate step
}


function handleLivingStatusChange() {
    const livingStatus = document.querySelector('input[name="livingStatus"]:checked').value;

    const depositItem = document.querySelector('.sidebar-item-deposit');
    const residenceTypeItem = document.querySelector('.sidebar-item-residence');
    const roomTypeItem = document.querySelector('.sidebar-item-room');

    if (livingStatus === 'on') {
        depositItem.style.display = 'block';  // Show the $450 Deposit step
        residenceTypeItem.classList.remove('disabled');
        roomTypeItem.classList.remove('disabled');
    } else {
        depositItem.style.display = 'none';   // Hide the $450 Deposit step
        residenceTypeItem.classList.add('disabled');
        roomTypeItem.classList.add('disabled');
    }

    showStep(currentStep); // Show the current step
}


// Function to select a college
function selectCollege(college) {
    selectedCollege = college;

    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('.option-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`button[onclick="selectCollege('${college}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }

    console.log("Selected College:", selectedCollege); // Debugging log
}



// Function to handle the living status change
function handleLivingStatusChange() {
    const livingStatus = document.querySelector('input[name="livingStatus"]:checked').value;

    // Grey out and disable Residence Type and Room Type based on living status
    const residenceTypeItem = document.querySelector('.sidebar-item-residence');
    const roomTypeItem = document.querySelector('.sidebar-item-room');

    if (livingStatus === 'off') {
        // Grey out and disable Residence Type and Room Type
        residenceTypeItem.classList.add('disabled');
        roomTypeItem.classList.add('disabled');
    } else {
        // Enable Residence Type and Room Type
        residenceTypeItem.classList.remove('disabled');
        roomTypeItem.classList.remove('disabled');
    }

    showStep(currentStep); // Show the current step
}

// Automatically grey out and disable Residence and Room Type steps when Off-Campus is selected
function updateSidebarState() {
    const isOffCampus = livingStatus === 'off';

    const residenceTypeItem = document.querySelector('.sidebar-item-residence');
    const roomTypeItem = document.querySelector('.sidebar-item-room');

    if (isOffCampus) {
        // Grey out and disable Residence Type and Room Type
        residenceTypeItem.classList.add('disabled');
        roomTypeItem.classList.add('disabled');
    } else {
        // Enable Residence Type and Room Type
        residenceTypeItem.classList.remove('disabled');
        roomTypeItem.classList.remove('disabled');
    }
}



function calculateCosts() {


    if (!selectedEntranceYear) {
        alert('Please select your entrance year.');
        return;
    }

    const cohortYear = selectedEntranceYear;  // Use the selected entrance year
    console.log("Selected Entrance Year:", cohortYear);


    if (!cohortYear) {
        alert('Please select your entrance year.');
        return;
    }

    // Ensure the livingStatus variable is properly captured
    console.log("Living Status:", livingStatus);

    if (!livingStatus) {
        alert('Please select a living status.');
        return;
    }

    // Use the global healthWaiverElement instead of querying the DOM
    if (!healthWaiverElement) {
        alert('Please complete the health waiver selection.');
        return;
    }
    console.log("Health Waiver:", healthWaiverElement);  // This should log 'yes' or 'no'
    console.log("Health Waiver:", healthWaiverElement);  // This should log 'yes' or 'no'

    if (!selectedResidencyStatus) {
        alert('Please select your residency status.');
        return;
    }

    isCaliforniaResident = selectedResidencyStatus === 'yes';

    // Ensure that the selected room type and dining plan are logged
    console.log("Selected Room Type:", selectedRoomType);
    console.log("Selected Dining Plan:", selectedDiningPlan);
    console.log("Has Paid Deposit:", hasPaidDeposit);
    console.log("Selected Residence Type:", selectedResidenceType);  // Check if residence type is captured
    console.log("Selected Residency Status:", selectedResidencyStatus);


    // Validate only if the user is living on-campus
    if (livingStatus === 'on') {
        if (!healthWaiverElement || !selectedRoomType || !selectedResidencyStatus || !selectedDiningPlan) {
            alert('Please complete all steps.');
            return;
        } else {
            if (!healthWaiverElement || !selectedResidencyStatus || !selectedDiningPlan) {
                alert('Please complete all steps.');
                return;
            }
        }
    }

    const healthWaiver = healthWaiverElement.value === 'yes' ? 898 : 0;

    let fallRoomCost = 0, winterRoomCost = 0, springRoomCost = 0;

    // Calculate room costs only if living On-Campus
    if (livingStatus === 'on') {
        // Room costs based on selected room type, dining plan, and residence type
        const roomCosts = {
            "single": {
                "RH": { "Sun God Blue": [5525, 5142, 5142], "Sun God Gold": [5995, 5582, 5582], "Triton": [6289, 5860, 5860], "Triton Blue": [6689, 6235, 6235 ], "Triton Gold" : [7211, 6724, 6724]},
                "Apt": { "Sun God Blue": [5718, 5323, 5323], "Sun God Gold": [6188, 5763, 5763],  "Triton": [6482, 6041, 6041], "Triton Blue": [6882, 6416, 6416], "Triton Gold": [7404, 6905, 6905]}
            },
            "double": {
                "RH": { "Sun God Blue": [5005, 4653, 4653], "Sun God Gold": [5475, 5093, 5093], "Triton": [5769, 5371, 5371], "Triton Blue": [6169, 5746, 5746 ], "Triton Gold": [6691, 6235, 6235 ] },
                "Apt": { "Sun God Blue": [5190, 4826, 4826], "Sun God Gold": [5658, 5267, 5267], "Triton": [5954, 5544, 5544], "Triton Blue": [6354, 5919, 5919], "Triton Gold": [6874, 6409, 6409] }
            },
            "triple": {
                "RH": { "Sun God Blue": [4623, 4295, 4295], "Sun God Gold": [5093, 4735, 4735], "Triton": [5387, 5013, 5013], "Triton Blue": [5787, 5388, 5388], "Triton Gold": [6309, 5877, 5877] },
                "Apt": { "Sun God Blue": [4808, 4468, 4468], "Sun God Gold": [5278, 4908, 4908], "Triton": [5572, 5186, 5186], "Triton Blue": [5972, 5561, 5561], "Triton Gold": [6494, 6050, 6050]  }
            }
        };

        const roomType = selectedRoomType.toLowerCase();
        const residenceType = selectedResidenceType;
        
        if (!residenceType) {
            console.error("Residence type is not selected.");
            alert('Please select a valid residence type.');
            return;
        }
        console.log(roomCosts["double"]["RH"]["Sun God Blue"]);  // This should print the value you're trying to access
        console.log(roomCosts);

        console.log("Selected Room Type:", selectedRoomType);  // Check room type
        console.log("Selected Residence Type:", residenceType); // Check residence type
        console.log("Selected Dining Plan:", selectedDiningPlan); // Check dining plan
        console.log("Room Costs Object:", roomCosts);  // Print the roomCosts object


        // Room costs for each quarter
        fallRoomCost = roomCosts[roomType][residenceType][selectedDiningPlan][0];
        winterRoomCost = roomCosts[roomType][residenceType][selectedDiningPlan][1];
        springRoomCost = roomCosts[roomType][residenceType][selectedDiningPlan][2];

        // Apply deposit deduction if they paid the deposit
        if (hasPaidDeposit) {
            fallRoomCost -= 450;  // Deduct the $450 deposit from the fall room cost
        }
    }

    // Tuition costs for the selected cohort year
    const tuitionCosts = {
        "2024": { "fall": 4812, "winter": 4812, "spring": 4812 },
        "2023": { "fall": 4584, "winter": 4584, "spring": 4584 },
        "2022": { "fall": 4368, "winter": 4368, "spring": 4368 },
        "2021": { "fall": 4190, "winter": 4190, "spring": 4190 }
    };

    const collegeFees = {
        "Muir": [17, 17, 17],
        "Revelle": [9, 9, 9],
        "Thurgood Marshall": [12.99, 12.99, 12.99],
        "Warren": [10.94, 10.94, 10.94],
        "Eleanor Roosevelt": [15, 15, 15],
        "Sixth": [14.96, 14.96, 14.96],
        "Seventh": [12.98, 12.98, 12.98]
    };

    const fixedFees = {
        "fall": 1840.09,
        "winter": 1674.09,
        "spring": 1674.09
    };

    const nonResidentFees = {
        "2024": 11400,
        "2023": 10858,
        "2022": 10342,
        "2021": 9918
    };

    // Adjust fixed fees if health waiver is selected
    const healthWaiverDeduction = healthWaiverElement === 'yes' ? 898 : 0;

    let fallFixedFee = fixedFees.fall - healthWaiverDeduction;
    const winterFixedFee = fixedFees.winter - healthWaiverDeduction;
    const springFixedFee = fixedFees.spring - healthWaiverDeduction;

    if (isFirstYear === false) {
        fallFixedFee -= 165;  // Discount $165 from the fall total
    }


    // Tuition costs for the selected cohort year
    const fallTuition = tuitionCosts[cohortYear].fall;
    const winterTuition = tuitionCosts[cohortYear].winter;
    const springTuition = tuitionCosts[cohortYear].spring;

    // College fees for the selected college
    const fallCollegeFee = collegeFees[selectedCollege] ? collegeFees[selectedCollege][0] : 0;
    const winterCollegeFee = collegeFees[selectedCollege] ? collegeFees[selectedCollege][1] : 0;
    const springCollegeFee = collegeFees[selectedCollege] ? collegeFees[selectedCollege][2] : 0;



    // Apply non-resident fees if not a California resident
    const fallNonResidentFee = !isCaliforniaResident ? nonResidentFees[cohortYear] : 0;
    const winterNonResidentFee = !isCaliforniaResident ? nonResidentFees[cohortYear] : 0;
    const springNonResidentFee = !isCaliforniaResident ? nonResidentFees[cohortYear] : 0;

    // Total costs calculation for each quarter

    // Apply the first-year discount if the student is not a first-year
    fallTotal = fallTuition + fallFixedFee + fallCollegeFee + fallNonResidentFee + fallRoomCost;
    winterTotal = winterTuition + winterFixedFee + winterCollegeFee + winterNonResidentFee + winterRoomCost;
    springTotal = springTuition + springFixedFee + springCollegeFee + springNonResidentFee + springRoomCost;
    
    const totalYear = fallTotal + winterTotal + springTotal;

    // Full breakdown for each quarter
    const detailedSummary = `
        <strong>Fall Quarter</strong><br>
        Tuition: $${fallTuition.toFixed(2)}<br>
        Fixed Fees: $${fallFixedFee.toFixed(2)}<br>
        College Fees: $${fallCollegeFee.toFixed(2)}<br>
        Room Cost: $${fallRoomCost.toFixed(2)}<br>
        Non-Resident Fee: $${fallNonResidentFee.toFixed(2)}<br>
        Total Cost: $${fallTotal.toFixed(2)}<br><br>

        <strong>Winter Quarter</strong><br>
        Tuition: $${winterTuition.toFixed(2)}<br>
        Fixed Fees: $${winterFixedFee.toFixed(2)}<br>
        College Fees: $${winterCollegeFee.toFixed(2)}<br>
        Room Cost: $${winterRoomCost.toFixed(2)}<br>
        Non-Resident Fee: $${winterNonResidentFee.toFixed(2)}<br>
        Total Cost: $${winterTotal.toFixed(2)}<br><br>

        <strong>Spring Quarter</strong><br>
        Tuition: $${springTuition.toFixed(2)}<br>
        Fixed Fees: $${springFixedFee.toFixed(2)}<br>
        College Fees: $${springCollegeFee.toFixed(2)}<br>
        Room Cost: $${springRoomCost.toFixed(2)}<br>
        Non-Resident Fee: $${springNonResidentFee.toFixed(2)}<br>
        Total Cost: $${springTotal.toFixed(2)}<br><br>

        <strong>Total Academic Year Cost:</strong><br>
        Total: $${totalYear.toFixed(2)}
    `;

    document.getElementById('totalCost').innerHTML = detailedSummary;

    // Disable the next button initially
    const nextButton = document.getElementById('nextButton');
    nextButton.disabled = true;

    // Enable the next button after 3 seconds
    setTimeout(() => {
        nextButton.disabled = false;
    }, 3000);

    // Show the costs results step
    showStep(11);
}



function calculateAidTotals() {
    // Retrieve all aid inputs for each quarter
    const calGrantAFall = parseFloat(document.getElementById('calGrantAFall').value) || 0;
    const calGrantAWinter = parseFloat(document.getElementById('calGrantAWinter').value) || 0;
    const calGrantASpring = parseFloat(document.getElementById('calGrantASpring').value) || 0;

    const calGrantBFall = parseFloat(document.getElementById('calGrantBFall').value) || 0;
    const calGrantBWinter = parseFloat(document.getElementById('calGrantBWinter').value) || 0;
    const calGrantBSpring = parseFloat(document.getElementById('calGrantBSpring').value) || 0;

    const ucsdGrantFall = parseFloat(document.getElementById('ucsdGrantFall').value) || 0;
    const ucsdGrantWinter = parseFloat(document.getElementById('ucsdGrantWinter').value) || 0;
    const ucsdGrantSpring = parseFloat(document.getElementById('ucsdGrantSpring').value) || 0;

    const pathwayFall = parseFloat(document.getElementById('pathwayFall').value) || 0;
    const pathwayWinter = parseFloat(document.getElementById('pathwayWinter').value) || 0;
    const pathwaySpring = parseFloat(document.getElementById('pathwaySpring').value) || 0;

    const subsidizedLoanFall = parseFloat(document.getElementById('subsidizedLoanFall').value) || 0;
    const subsidizedLoanWinter = parseFloat(document.getElementById('subsidizedLoanWinter').value) || 0;
    const subsidizedLoanSpring = parseFloat(document.getElementById('subsidizedLoanSpring').value) || 0;

    const unsubsidizedLoanFall = parseFloat(document.getElementById('unsubsidizedLoanFall').value) || 0;
    const unsubsidizedLoanWinter = parseFloat(document.getElementById('unsubsidizedLoanWinter').value) || 0;
    const unsubsidizedLoanSpring = parseFloat(document.getElementById('unsubsidizedLoanSpring').value) || 0;

    const otherAidFall = parseFloat(document.getElementById('otherAidFall').value) || 0;
    const otherAidWinter = parseFloat(document.getElementById('otherAidWinter').value) || 0;
    const otherAidSpring = parseFloat(document.getElementById('otherAidSpring').value) || 0;

    // Calculate the total aid for each quarter
    const totalAidFall = calGrantAFall + calGrantBFall + ucsdGrantFall + pathwayFall + subsidizedLoanFall + unsubsidizedLoanFall + otherAidFall;
    const totalAidWinter = calGrantAWinter + calGrantBWinter + ucsdGrantWinter + pathwayWinter + subsidizedLoanWinter + unsubsidizedLoanWinter + otherAidWinter;
    const totalAidSpring = calGrantASpring + calGrantBSpring + ucsdGrantSpring + pathwaySpring + subsidizedLoanSpring + unsubsidizedLoanSpring + otherAidSpring;

    // Update the totals in the table
    document.getElementById('totalAidFall').textContent = `$${totalAidFall.toFixed(2)}`;
    document.getElementById('totalAidWinter').textContent = `$${totalAidWinter.toFixed(2)}`;
    document.getElementById('totalAidSpring').textContent = `$${totalAidSpring.toFixed(2)}`;
}

// Function to display final results after subtracting financial aid
function showFinalResults() {
    // Capture the financial aid inputs
    const fallAid = parseFloat(document.getElementById("totalAidFall").innerText.replace('$', '')) || 0;
    const winterAid = parseFloat(document.getElementById("totalAidWinter").innerText.replace('$', '')) || 0;
    const springAid = parseFloat(document.getElementById("totalAidSpring").innerText.replace('$', '')) || 0;

    // Calculate the final cost after subtracting financial aid
    const finalFallTotal = fallTotal - fallAid;
    const finalWinterTotal = winterTotal - winterAid;
    const finalSpringTotal = springTotal - springAid;

    const finalYearTotal = finalFallTotal + finalWinterTotal + finalSpringTotal;

    // Display the final results
    const finalSummary = `
        <strong>Fall Quarter (After Aid):</strong><br>
        Original Cost: $${fallTotal.toFixed(2)}<br>
        Financial Aid: $${fallAid.toFixed(2)}<br>
        Amount to Pay: $${finalFallTotal.toFixed(2)}<br><br>

        <strong>Winter Quarter (After Aid):</strong><br>
        Original Cost: $${winterTotal.toFixed(2)}<br>
        Financial Aid: $${winterAid.toFixed(2)}<br>
        Amount to Pay: $${finalWinterTotal.toFixed(2)}<br><br>

        <strong>Spring Quarter (After Aid):</strong><br>
        Original Cost: $${springTotal.toFixed(2)}<br>
        Financial Aid: $${springAid.toFixed(2)}<br>
        Amount to Pay: $${finalSpringTotal.toFixed(2)}<br><br>

        <strong>Total Academic Year (After Aid):</strong><br>
        Total Amount to Pay: $${finalYearTotal.toFixed(2)}
    `;

    document.getElementById('finalCost').innerHTML = finalSummary;

    // Show the final results step
    showStep(13); // Corrected from 11 to 10
}


// Update the sidebar to use `showStep` properly
const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach((item, index) => {
    item.addEventListener('click', function () {
        showStep(index + 1, true); // Always pass `true` for sidebar navigation
    });
});

// Call this function to show the initial step on page load
showStep(1);

