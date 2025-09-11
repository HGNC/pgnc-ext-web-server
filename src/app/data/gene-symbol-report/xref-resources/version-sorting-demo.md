# Phytozome Version Handling Demo

## How the Dynamic Version Detection Works

The updated code now automatically handles any number of Phytozome versions without requiring code changes for new versions.

### Version Sorting Examples

The `extractVersionNumber` method converts version strings to comparable numbers:

- `"Phytozome v4_1"` → `4.1`
- `"Phytozome v3_1"` → `3.1`
- `"Phytozome v5_2"` → `5.2` (future version example)
- `"Phytozome v10_0"` → `10.0` (future version example)

### Priority Logic

1. **Automatic Detection**: Finds all resources starting with "Phytozome v"
2. **Version Sorting**: Sorts by version number (highest first)
3. **Data-Driven Selection**: Returns the highest version that has actual data
4. **Fallback**: If no data exists for any version, returns null

### Adding New Versions

To add a new Phytozome version (e.g., v5_2), you only need to update three places:

1. **Type Definition** (`external-resource-name.type.ts`):

   ```typescript
   | 'Phytozome v5_2'
   ```

2. **Resource URLs** (`xref-resources.component.ts`):

   ```typescript
   'Phytozome v5_2': 'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v5_2/',
   ```

3. **Initialize Data Structure** (`xref-resources.component.ts`):

   ```typescript
   'Phytozome v5_2': [],
   ```

4. **Fragment Mapping** (if different from existing):

   ```typescript
   'Phytozome v5_2': 'phytoz', // or unique fragment if needed
   ```

The component logic will automatically:

- Detect the new version
- Sort it correctly (v5_2 > v4_1 > v3_1)
- Display it if data is available
- Fall back to lower versions if no data exists for v5_2

### Benefits

- **Future-Proof**: No changes needed to the core logic
- **Maintainable**: Clear separation of configuration vs. logic
- **Flexible**: Handles any version numbering scheme following the pattern
- **Robust**: Graceful fallback when versions have no data
