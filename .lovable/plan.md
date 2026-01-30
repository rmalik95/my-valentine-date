

## Add Couple Photos to Valentine Website

### Overview
Add the two beautiful couple photos you uploaded to the Valentine landing page, replacing the current placeholder heart icon.

### Implementation Details

**1. Copy Images to Project**
- Copy `IMG_0628.jpeg` (Glasgow photo) to `src/assets/couple-photo-1.jpeg`
- Copy `IMG_5927.jpeg` (Porto selfie) to `src/assets/couple-photo-2.jpeg`

**2. Update ValentineLanding Component**
- Replace the current heart icon placeholder with the two photos
- Display them in a visually appealing way - either as:
  - A single featured photo in the circular frame, OR
  - A carousel/slideshow rotating between both photos
- Keep the romantic styling with the pink border and pulsing heart decoration

### Recommended Display Option
Create a **photo carousel** that smoothly transitions between both photos, making the landing page more dynamic and showcasing both memorable moments.

### Files to Modify
- `src/components/ValentineLanding.tsx` - Update photo display section

### Technical Notes
- Images will be imported as ES6 modules for proper bundling
- Use existing Embla carousel component or simple CSS animation for transitions
- Maintain responsive design for mobile and desktop

