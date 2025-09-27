$headers = @{
    "Content-Type" = "application/json"
}

# Define the base URL - make sure this matches your API server
$baseUrl = "http://localhost:8080" # Change this to match your server port

Write-Host "===========================================" 
Write-Host "TESTING: api/product/get-product-by-category"
Write-Host "===========================================" 
Write-Host ""

Write-Host "Step 1: Getting all categories..."
try {
    $categoryEndpoint = "$baseUrl/evergo/category/get"
    Write-Host "Calling endpoint: $categoryEndpoint"
    
    $categoryResponse = Invoke-RestMethod -Uri $categoryEndpoint -Method Get -Headers $headers
    
    if ($categoryResponse.data.Count -gt 0) {
        Write-Host "✓ Found" $categoryResponse.data.Count "categories!"
        
        # Display available categories for testing
        Write-Host ""
        Write-Host "Available Categories:"
        Write-Host "--------------------"
        foreach ($category in $categoryResponse.data) {
            Write-Host "ID: $($category._id) | Name: $($category.name)"
        }
        Write-Host ""
        
        # Test the product API with each category ID
        $productEndpoint = "$baseUrl/evergo/product/get-product-by-category"
        
        Write-Host "Step 2: Testing each category ID with the product API..."
        Write-Host "Endpoint: $productEndpoint"
        Write-Host ""
        
        foreach ($category in $categoryResponse.data) {
            $categoryId = $category._id
            $categoryName = $category.name
            
            Write-Host "Testing category: $categoryName (ID: $categoryId)"
            
            # Important: Notice the property is "id" not "category" according to the controller
            $body = @{
                id = $categoryId
            } | ConvertTo-Json
            
            Write-Host "Request body: $body"
            
            try {
                $productResponse = Invoke-RestMethod -Uri $productEndpoint -Method Post -Headers $headers -Body $body
                
                # Display the results
                Write-Host "✓ API call successful"
                Write-Host "  - Status: $($productResponse.success)"
                Write-Host "  - Message: $($productResponse.message)"
                Write-Host "  - Products found: $($productResponse.data.Length)"
                
                if ($productResponse.data.Length -gt 0) {
                    Write-Host "  - First product name: $($productResponse.data[0].name)"
                    Write-Host "  - Product has matching category? " -NoNewline
                    
                    # Check if the product's category array includes the requested category ID
                    $hasMatchingCategory = $false
                    foreach ($productCategory in $productResponse.data[0].category) {
                        if ($productCategory -eq $categoryId) {
                            $hasMatchingCategory = $true
                            break
                        }
                    }
                    
                    if ($hasMatchingCategory) {
                        Write-Host "YES" -ForegroundColor Green
                    } else {
                        Write-Host "NO" -ForegroundColor Red
                        Write-Host "  - Product categories: $($productResponse.data[0].category -join ', ')"
                    }
                } else {
                    Write-Host "  - No products found for this category" -ForegroundColor Yellow
                }
            } catch {
                Write-Host "✗ Error calling API for category $categoryName:" -ForegroundColor Red
                Write-Host "  $_"
                
                if ($_.Exception.Response) {
                    Write-Host "  Status Code: $($_.Exception.Response.StatusCode.value__)"
                }
                
                if ($_.ErrorDetails.Message) {
                    Write-Host "  Error Details: $($_.ErrorDetails.Message)"
                }
            }
            
            Write-Host "--------------------"
        }
    } else {
        Write-Host "No categories found in the database." -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error retrieving categories:" -ForegroundColor Red
    Write-Host "$_"
    
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    }
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Error Details: $($_.ErrorDetails.Message)"
    }
}