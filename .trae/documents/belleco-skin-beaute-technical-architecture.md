## 1. Architecture Design
```mermaid
flowchart TB
  U["User Browser"] --> FE["Frontend (React SPA)"]
  FE --> RT["Client Router"]
  FE --> UI["UI Components"]
  FE --> DS["In-App Data (Static JSON)"]
  FE --> LS["Local Storage (Booking Drafts)"]
  FE --> EXT["External Links"]
  EXT --> WA["WhatsApp Link"]
  EXT --> TEL["tel: Link"]
  EXT --> MAIL["mailto: Link"]
  EXT --> MAP["Maps Link"]
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + tailwindcss@3 + vite
- Initialization Tool: vite-init
- Backend: None (static SPA)
- Data: static JSON modules in-repo + localStorage for user booking drafts

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | Home page (positioning, proof, concern navigator, CTA) |
| /treatments | Treatments catalog + FAQ |
| /stories | Transformation stories + filters |
| /book | Appointment request form + confirmation |

## 4. API Definitions (if backend exists)
None.

## 5. Server Architecture Diagram (if backend exists)
None.

## 6. Data Model (if applicable)
### 6.1 Data Model Definition
```mermaid
erDiagram
  TREATMENT {
    string id
    string name
    string[] concerns
    string duration
    string[] outcomes
    string[] highlights
  }
  STORY {
    string id
    string title
    string concern
    string[] timeline
    string quote
  }
  BOOKING_REQUEST {
    string id
    string fullName
    string phone
    string email
    string preferredContact
    string concern
    string preferredDate
    string preferredTime
    string notes
    boolean consent
  }
```

### 6.2 Data Definition Language
Not applicable (no database).

