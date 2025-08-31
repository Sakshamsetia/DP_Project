// State management
const STATES = {
    UPLOADING: 'UPLOADING',
    PROCESSING: 'PROCESSING',
    REPORT_READY: 'REPORT_READY'
};

// Sample report data
const SAMPLE_REPORT = {
    findings: `1. There is a 2.3 cm nodular opacity in the right upper lobe with spiculated margins.
2. Mild mediastinal lymphadenopathy noted, largest node measuring 1.5 cm in short axis.
3. No pleural effusion or pneumothorax.
4. Cardiac silhouette is normal in size.
5. Osseous structures are unremarkable.`,
    impression: `Suspicious pulmonary nodule in the right upper lobe, concerning for primary lung malignancy. Recommend CT chest with contrast for further characterization.`,
    recommendations: `1. CT chest with contrast for further evaluation of the right upper lobe nodule.
2. Consider PET-CT for staging if malignancy is confirmed.
3. Tissue diagnosis via CT-guided biopsy or bronchoscopy.
4. Follow-up in 1-2 weeks with results of further imaging.`
};

// App component
class RadiologyApp {
    constructor() {
        this.state = STATES.UPLOADING;
        this.selectedFile = null;
        this.imagePreview = null;
        this.reportData = { ...SAMPLE_REPORT };
        this.init();
    }

    init() {
        this.render();
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    handleFileSelect(file) {
        if (!file.type.match('image.*')) {
            alert('Please upload an image file');
            return;
        }

        this.selectedFile = file;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            this.imagePreview = e.target.result;
            this.render();
        };
        reader.readAsDataURL(file);
    }

    simulateProcessing() {
        this.setState(STATES.PROCESSING);
        
        // Simulate processing delay
        setTimeout(() => {
            this.setState(STATES.REPORT_READY);
        }, 3000);
    }

    handleReportChange(section, value) {
        this.reportData[section] = value;
    }

    saveChanges() {
        // In a real app, this would send the updated report to the server
        alert('Report saved successfully!');
    }

    downloadPDF() {
        // In a real app, this would generate a PDF
        alert('PDF download would be initiated here');
    }

    clearAll() {
        this.state = STATES.UPLOADING;
        this.selectedFile = null;
        this.imagePreview = null;
        this.reportData = { ...SAMPLE_REPORT };
        this.render();
    }

    render() {
        const appElement = document.getElementById('app');
        
        switch(this.state) {
            case STATES.UPLOADING:
                appElement.innerHTML = this.renderUploadingState();
                break;
            case STATES.PROCESSING:
                appElement.innerHTML = this.renderProcessingState();
                break;
            case STATES.REPORT_READY:
                appElement.innerHTML = this.renderReportReadyState();
                break;
        }

        this.attachEventListeners();
    }

    renderUploadingState() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="fade-in">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Upload Medical Image</h2>
                    <div 
                        class="drag-area border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50"
                        id="dropArea"
                    >
                        ${this.imagePreview ? `
                            <div class="mb-4">
                                <img src="${this.imagePreview}" alt="Preview" class="max-h-64 mx-auto rounded-lg shadow-md">
                            </div>
                            <p class="text-gray-700">Image selected: ${this.selectedFile.name}</p>
                            <button class="mt-4 text-blue-500 hover:text-blue-700" id="changeImage">Change Image</button>
                        ` : `
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            </svg>
                            <p class="text-gray-700">Drag & drop your image here or click to browse</p>
                            <p class="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG, DICOM</p>
                        `}
                        <input type="file" class="hidden" id="fileInput" accept="image/*">
                    </div>
                    <button 
                        id="generateBtn"
                        class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        ${this.imagePreview ? '' : 'disabled'}
                    >
                        Generate Report
                    </button>
                </div>
                
                <div class="fade-in">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Report Preview</h2>
                    <div class="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
                        <p class="text-gray-500 text-center">Awaiting image upload. The generated report will appear here.</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderProcessingState() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="fade-in">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Analyzing Image</h2>
                    <div class="border border-gray-200 rounded-lg p-4">
                        ${this.imagePreview ? `
                            <div class="mb-4">
                                <img src="${this.imagePreview}" alt="Preview" class="max-h-64 mx-auto rounded-lg shadow-md opacity-90">
                            </div>
                        ` : ''}
                        <div class="flex flex-col items-center justify-center py-6">
                            <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                            <p class="text-gray-700 font-medium">Analyzing Image... Please Wait</p>
                            <p class="text-gray-500 text-sm mt-2">This may take a few moments</p>
                        </div>
                    </div>
                </div>
                
                <div class="fade-in">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Report Preview</h2>
                    <div class="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
                        <p class="text-gray-500 text-center">Generating report...</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderReportReadyState() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="fade-in">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Image Analysis Complete</h2>
                    <div class="border border-gray-200 rounded-lg p-4">
                        ${this.imagePreview ? `
                            <div class="mb-4">
                                <img src="${this.imagePreview}" alt="Preview" class="max-h-64 mx-auto rounded-lg shadow-md">
                            </div>
                        ` : ''}
                        <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                            <p class="font-medium">Analysis Complete</p>
                            <p class="text-sm">Report is ready for review</p>
                        </div>
                        <button class="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors" id="newAnalysis">
                            Analyze New Image
                        </button>
                    </div>
                </div>
                
                <div class="fade-in">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">AI Generated Report</h2>
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-2">Findings</label>
                            <textarea 
                                class="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                id="findingsInput"
                            >${this.reportData.findings}</textarea>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-2">Impression</label>
                            <textarea 
                                class="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                id="impressionInput"
                            >${this.reportData.impression}</textarea>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 font-medium mb-2">Recommendations</label>
                            <textarea 
                                class="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                id="recommendationsInput"
                            >${this.reportData.recommendations}</textarea>
                        </div>
                        
                        <div class="flex flex-wrap gap-3">
                            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex-1" id="saveBtn">
                                Save Changes
                            </button>
                            <button class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex-1" id="downloadBtn">
                                Download PDF
                            </button>
                            <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex-1" id="clearBtn">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // File input handling
        const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('fileInput');
        const generateBtn = document.getElementById('generateBtn');
        const changeImageBtn = document.getElementById('changeImage');
        
        if (dropArea && fileInput) {
            // Click to select file
            dropArea.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Drag and drop handling
            dropArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropArea.classList.add('active');
            });
            
            dropArea.addEventListener('dragleave', () => {
                dropArea.classList.remove('active');
            });
            
            dropArea.addEventListener('drop', (e) => {
                e.preventDefault();
                dropArea.classList.remove('active');
                
                if (e.dataTransfer.files.length) {
                    this.handleFileSelect(e.dataTransfer.files[0]);
                }
            });
        }
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }
        
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.simulateProcessing();
            });
        }
        
        if (changeImageBtn) {
            changeImageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.click();
            });
        }
        
        // Report ready state buttons
        const saveBtn = document.getElementById('saveBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const clearBtn = document.getElementById('clearBtn');
        const newAnalysisBtn = document.getElementById('newAnalysis');
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveChanges();
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadPDF();
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearAll();
            });
        }
        
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', () => {
                this.clearAll();
            });
        }
        
        // Textarea change handlers for report editing
        const findingsInput = document.getElementById('findingsInput');
        const impressionInput = document.getElementById('impressionInput');
        const recommendationsInput = document.getElementById('recommendationsInput');
        
        if (findingsInput) {
            findingsInput.addEventListener('input', (e) => {
                this.handleReportChange('findings', e.target.value);
            });
        }
        
        if (impressionInput) {
            impressionInput.addEventListener('input', (e) => {
                this.handleReportChange('impression', e.target.value);
            });
        }
        
        if (recommendationsInput) {
            recommendationsInput.addEventListener('input', (e) => {
                this.handleReportChange('recommendations', e.target.value);
            });
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RadiologyApp();
});