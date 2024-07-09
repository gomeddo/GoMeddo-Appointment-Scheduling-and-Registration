<h1 align="center">Book a Dentist Appointment</h1>

<p align="center">
  <img src="./src/assets/dashboard.png" alt="Student Housing Dashboard" width="700" height="367">
</p>

## High-Level Use Case

This example provides a starting point for integrating a "**dentist appointment booking**" capabilities into your website using the GoMeddo Javascript SDK. It focuses on booking appointments of type "checkup" for in America, considering both Resource and Staff availability.

## Overview of User Interaction on the Frontend

The application interface allows users to specify their preferences for a dentist appointment. They can select a time preference in the filters, The system then returns available time slots based on the availability of both resources (rooms) and staff members, The user can select their preferred time slot and make an appointment.

# Step-by-Step Guide to Setting Up The Example

1. **Set Up Resource Structure**:

   - Define the hierarchical structure for your resources:
     - **Country** > **City** > **Building** > **Room**.
   - Example:
     - **Country**: United States Of America
     - **City**: New York
     - **Building**: Dental Clinic Uptown
     - **Room**: Room 101

2. **Create Resources**:

 - Create resources for the clinic you want to display on the frontend.
 - Ensure each resource is linked to the appropriate resource type, description, and other custom fields.

3.  **Define Multi-Dimensional Availability**:

 - Set up availability rules for staff members based on their skills and preferred locations (buildings/rooms).

4. **Create Reservation Types**:

   - Define reservation types that correspond to different appointment types (e.g., "checkup").

5. **Create Custom Fields Under the Objects**:

   - Add the following custom fields to the resource object *"Building"* to provide detailed information about each dental clinic:

     - `Dentist_City__c` (Formula Text Field)
     - `Dentist_Location__c` (Long Text Area Field)
     - `Dentist_Rating__c` (Number Field)
     - `B25__Image_Url__c` (URL Field)
     - `B25__Default_Price__c` (Currency Field)

   - Add the following custom fields to the contact object provide a message for each dentist:

     - `Dentist_Message__c` (Long Text Area Field)

Note:
- Ensure that each resource in GoMeddo is marked as '**_isActive_**' and '**_Api Visible_**' to be displayed and available through the API.
- Ensure that **resources**, **resources types**, **custom fields** and **reservation types** are set up in _GoMeddo_. For the dental clinics to accurately display available clinics and timeslots, each clinic must be created as a resource within _GoMeddo_. This step is vital as the SDK relies on these **resources** to present customers with real-time availability and booking options.

## API Key Requirement

To access to the SDK’s functionalities, an API key from _GoMeddo_ is required. For instructions on obtaining this key refer to [First time Set-up](https://gomeddo.atlassian.net/wiki/spaces/WID/pages/3353837569/First+time+Set-up). Remember to **whitelist** your domain as a part of the setup process and grant **privileged** access to the API key.
