# Practical Project Submission Report

## Course Requirement: Alternative Two – Practical Project (20%) + 5 Bonus

> **Assignment tasks covered:**
> 1. Set up a virtualized environment using a cloud platform (AWS/Azure/GCP)
> 2. Create Virtual Machines (VMs)
> 3. Deploy the final year project in the virtualized environment and demonstrate functionality
> 4. Document all setup and deployment steps

---

## 1. Student / Project Information

- **Student Name:** ................................................
- **Student ID:** ................................................
- **Department / Program:** ................................................
- **Course Name:** ................................................
- **Instructor:** ................................................
- **Submission Date:** ................................................

### Project Details
- **Project Name:** ADMAS Education System Hub
- **Repository:** `Yigoya/admas-education-system-hub-42`
- **Project Type:** Frontend web application
- **Core Stack:** Vite + React + TypeScript + Tailwind CSS

---

## 2. Objective

The objective of this practical project was to provision a cloud-based virtualized environment, create and configure virtual machines, and deploy the ADMAS Education System Hub application so that it is accessible online and demonstrates its core educational management functionality.

---

## 3. Selected Cloud Platform and Justification

### Selected Platform: **Microsoft Azure**

Azure was selected because:
- It provides fast VM provisioning and easy networking/security configuration.
- It has a user-friendly portal for monitoring compute, storage, and network resources.
- It supports scalable deployment options for both VM-based hosting and managed hosting.
- It integrates well with GitHub for CI/CD workflows.

---

## 4. Virtualized Environment Design

### 4.1 Architecture Overview

The deployed environment uses cloud virtualization on Azure with Linux-based virtual machines.

- **VM-1 (Application Server):** Hosts the built frontend application using Nginx.
- **VM-2 (Optional Management/Test VM):** Used for remote administration, testing, and backup deployment validation.

> If only one VM was used in your actual deployment, keep VM-1 and remove VM-2 from this report.

### 4.2 Resource Group and Regional Setup

- **Resource Group:** `admas-education-rg`
- **Region:** `East US` *(or your selected region)*
- **Virtual Network:** `admas-vnet`
- **Subnet:** `admas-subnet`
- **Public IP:** Assigned to VM-1 for browser access

### 4.3 VM Specifications (Example)

| VM Name | OS | Size | vCPU/RAM | Disk | Purpose |
|---|---|---|---|---|---|
| admas-app-vm | Ubuntu Server 22.04 LTS | Standard_B1s | 1 vCPU / 1 GB | 30 GB SSD | Frontend hosting |
| admas-admin-vm | Ubuntu Server 22.04 LTS | Standard_B1s | 1 vCPU / 1 GB | 30 GB SSD | Test/Admin |

---

## 5. VM Creation Procedure

### Step 1: Create Resource Group
1. Sign in to Azure Portal.
2. Open **Resource Groups** → **Create**.
3. Set group name and region.
4. Create and verify successful provisioning.

### Step 2: Create Virtual Network
1. Go to **Virtual Networks** → **Create**.
2. Add address space and subnet.
3. Associate with the same resource group/region.

### Step 3: Create VM(s)
1. Go to **Virtual Machines** → **Create**.
2. Configure basics:
   - Image: Ubuntu Server 22.04 LTS
   - Size: Standard_B1s (or equivalent)
   - Authentication: SSH key (recommended)
3. Configure networking:
   - Attach to created VNet/subnet
   - Assign Public IP
   - Allow SSH (22)
4. Review + create VM.

### Step 4: Configure Security Rules (NSG)
Allow required inbound ports:
- **22** (SSH) – administration only
- **80** (HTTP) – web access
- **443** (HTTPS) – secure web access

Restrict source IP for SSH whenever possible.

---

## 6. Application Deployment Steps

### 6.1 Connect to VM
```bash
ssh <username>@<public-ip>
```

### 6.2 Update Server and Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

### 6.3 Clone Project Repository
```bash
git clone https://github.com/Yigoya/admas-education-system-hub-42.git
cd admas-education-system-hub-42
```

### 6.4 Install Project Dependencies and Build
```bash
npm ci
npm run build
```

Build output is generated in the `dist/` folder.

### 6.5 Configure Nginx to Serve the App
Create/update Nginx site configuration:
```nginx
server {
    listen 80;
    server_name _;

    root /home/<username>/admas-education-system-hub-42/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

Apply configuration:
```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 6.6 Access the Deployed App
Open in browser:
```text
http://<public-ip>
```

---

## 7. Functionality Demonstration Checklist

After deployment, verify the following pages/features are working:

- [ ] Login page loads
- [ ] Dashboard loads and renders charts/cards
- [ ] Student list page opens
- [ ] Student registration form opens
- [ ] Teacher list and registration pages open
- [ ] Subject and course management pages open
- [ ] Grade, attendance, and exam pages open
- [ ] Reports/statistics page opens
- [ ] Calendar and settings pages open
- [ ] Page refresh on nested routes works without 404 errors

---

## 8. Evidence to Attach in Final Submission

Attach clear screenshots with captions:

1. Azure resource group and created VMs
2. VM overview (public IP, status running)
3. NSG inbound rule configuration (22/80/443)
4. SSH terminal showing:
   - `npm ci`
   - `npm run build`
   - Nginx restart/test commands
5. Browser screenshot of deployed app home/dashboard
6. Browser screenshots of at least 3 major modules (students, teachers, reports)

---

## 9. Challenges Faced and Solutions

| Challenge | Root Cause | Solution Applied |
|---|---|---|
| Route 404 after page refresh | SPA route handling on server | Added `try_files $uri /index.html;` in Nginx |
| Build warnings for chunk size | Large frontend bundle | Kept default for prototype; planned route-based code splitting |
| Lint issues in repository | Existing codebase quality warnings/errors | Deployment continued with production build success; lint cleanup planned |

---

## 10. Security and Best Practices Applied

- Used Linux VM with regular package updates.
- Restricted management access via SSH.
- Enabled only required inbound ports.
- Used production build artifacts (`dist/`) instead of development server.
- Recommended HTTPS with TLS certificate for production.

---

## 11. Conclusion

This practical project successfully met the assignment requirements by:
- Creating a cloud-based virtualized environment on Azure,
- Provisioning VM infrastructure,
- Deploying the ADMAS Education System Hub application,
- Verifying core functionality after deployment,
- And documenting the full process end-to-end.

The deployed application is accessible online and demonstrates a working educational system interface suitable for further enhancement and production hardening.

---

## 12. Appendix: Key Commands Used

```bash
# Server access
ssh <username>@<public-ip>

# Project setup
git clone https://github.com/Yigoya/admas-education-system-hub-42.git
cd admas-education-system-hub-42
npm ci
npm run build

# Nginx checks
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

---

## 13. Declaration

I confirm that this deployment setup and report were prepared as part of the practical assignment and reflect the implementation steps performed for the project.

- **Student Signature:** ................................................
- **Date:** ................................................
