import * as react from 'react';
import react__default from 'react';
import * as ai from 'ai';

interface CalendarEvent$1 {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location?: string;
    attendees?: string[];
    status: 'pending' | 'confirmed' | 'cancelled';
}
interface CalendarProps {
    output: {
        events: CalendarEvent$1[];
        totalEvents: number;
        nextEvent?: CalendarEvent$1;
    };
    input?: {
        date?: string;
        userId?: string;
    };
    onAction?: (action: {
        action: string;
        data?: any;
        context?: any;
    }) => void;
}
declare const CalendarLoading: React.FC<{
    input?: {
        date?: string;
        userId?: string;
    };
    onAction?: (action: {
        action: string;
        data?: any;
        context?: any;
    }) => void;
}>;
declare const CalendarComponent: React.FC<CalendarProps>;
declare const CalendarError: React.FC<{
    error: string;
    input?: {
        date?: string;
        userId?: string;
    };
    onAction?: (action: {
        action: string;
        data?: any;
        context?: any;
    }) => void;
}>;

interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    allDay: boolean;
    location?: string;
    attendees?: string[];
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'confirmed' | 'cancelled';
    recurring?: {
        type: 'daily' | 'weekly' | 'monthly' | 'yearly';
        interval: number;
        endAfter?: number;
        endDate?: string;
    };
    createdAt: string;
    updatedAt: string;
}
interface CalendarView {
    type: 'month' | 'week' | 'day';
    startDate: string;
    endDate: string;
    events: CalendarEvent[];
}
interface GetEventsOutput {
    events: CalendarEvent[];
    total: number;
    view: CalendarView;
}
interface CreateEventOutput {
    event: CalendarEvent;
    message: string;
}
interface UpdateEventOutput {
    event: CalendarEvent;
    message: string;
}
interface DeleteEventOutput {
    deletedEvent: CalendarEvent;
    message: string;
}

declare const getEvents: ai.Tool<{
    startDate?: string | undefined;
    endDate?: string | undefined;
    filters?: {
        status?: "pending" | "confirmed" | "cancelled" | undefined;
        search?: string | undefined;
        priority?: "low" | "medium" | "high" | undefined;
        color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
    } | undefined;
}, GetEventsOutput>;

declare const createEvent: ai.Tool<{
    startDate: string;
    title: string;
    description?: string | undefined;
    endDate?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
    recurring?: {
        type: "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        endDate?: string | undefined;
        endAfter?: number | undefined;
    } | undefined;
    allDay?: boolean | undefined;
    location?: string | undefined;
    attendees?: string[] | undefined;
}, CreateEventOutput>;

declare const updateEvent: ai.Tool<{
    eventId: string;
    updates: {
        status?: "pending" | "confirmed" | "cancelled" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        priority?: "low" | "medium" | "high" | undefined;
        color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
        title?: string | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            endAfter?: number | undefined;
        } | undefined;
        allDay?: boolean | undefined;
        location?: string | undefined;
        attendees?: string[] | undefined;
    };
}, UpdateEventOutput>;

declare const deleteEvent: ai.Tool<{
    eventId: string;
    deleteRecurring?: boolean | undefined;
}, DeleteEventOutput>;

declare const calendarEventsExample: {
    toolId: string;
    tool: ai.Tool<{
        startDate?: string | undefined;
        endDate?: string | undefined;
        filters?: {
            status?: "pending" | "confirmed" | "cancelled" | undefined;
            search?: string | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
        } | undefined;
    }, GetEventsOutput>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                date?: string;
                userId?: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
        SuccessComponent: react.FC<CalendarProps>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                date?: string;
                userId?: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
    };
};
declare const calendarTools: {
    getEvents: ai.Tool<{
        startDate?: string | undefined;
        endDate?: string | undefined;
        filters?: {
            status?: "pending" | "confirmed" | "cancelled" | undefined;
            search?: string | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
        } | undefined;
    }, GetEventsOutput>;
    createEvent: ai.Tool<{
        startDate: string;
        title: string;
        description?: string | undefined;
        endDate?: string | undefined;
        priority?: "low" | "medium" | "high" | undefined;
        color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            endAfter?: number | undefined;
        } | undefined;
        allDay?: boolean | undefined;
        location?: string | undefined;
        attendees?: string[] | undefined;
    }, CreateEventOutput>;
    updateEvent: ai.Tool<{
        eventId: string;
        updates: {
            status?: "pending" | "confirmed" | "cancelled" | undefined;
            description?: string | undefined;
            startDate?: string | undefined;
            endDate?: string | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
            title?: string | undefined;
            recurring?: {
                type: "daily" | "weekly" | "monthly" | "yearly";
                interval: number;
                endDate?: string | undefined;
                endAfter?: number | undefined;
            } | undefined;
            allDay?: boolean | undefined;
            location?: string | undefined;
            attendees?: string[] | undefined;
        };
    }, UpdateEventOutput>;
    deleteEvent: ai.Tool<{
        eventId: string;
        deleteRecurring?: boolean | undefined;
    }, DeleteEventOutput>;
};

declare const getProductInfo: ai.Tool<{
    name: string;
}, {
    product: {
        id: string;
        name: string;
        price: number;
        currency: string;
        category: string;
        brand: string;
        rating: number;
        reviews: number;
        inStock: boolean;
        description: string;
        features: string[];
        images: string[];
    } | {
        id: string;
        name: string;
        price: number;
        currency: string;
        category: string;
        brand: string;
        rating: number;
        reviews: number;
        inStock: boolean;
        description: string;
        features: string[];
        images: string[];
    } | {
        id: string;
        name: string;
        price: number;
        currency: string;
        category: string;
        brand: string;
        rating: number;
        reviews: number;
        inStock: boolean;
        description: string;
        features: string[];
        images: string[];
    };
    timestamp: string;
    source: string;
}>;

interface ProductInfo {
    id: string;
    name: string;
    price: number;
    currency: string;
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    description: string;
    features: string[];
    images: string[];
}
interface ProductCardProps {
    output: {
        product: ProductInfo;
        timestamp: string;
        source: string;
    };
    input?: {
        productId: string;
    };
    onAction?: (action: {
        action: string;
        data?: any;
        context?: any;
    }) => void;
}
declare const ProductCardLoading: React.FC<{
    input?: {
        productId: string;
    };
    onAction?: (action: {
        action: string;
        data?: any;
        context?: any;
    }) => void;
}>;
declare const ProductCard: React.FC<ProductCardProps>;
declare const ProductCardError: React.FC<{
    error: string;
    input?: {
        productId: string;
    };
    onAction?: (action: {
        action: string;
        data?: any;
        context?: any;
    }) => void;
}>;

declare const searchImages: ai.Tool<{
    query: string;
    count?: number | undefined;
    orientation?: "landscape" | "portrait" | "square" | undefined;
    license?: "free" | "commercial" | "any" | undefined;
}, any>;

declare const ImageGalleryLoading: react__default.FC<{
    input?: {
        query: string;
    };
}>;
declare const ImageGallery: react__default.FC<{
    output: {
        query: string;
        results: Array<{
            id: string;
            url: string;
            alt: string;
            title: string;
            photographer: string;
            tags: string[];
            width: number;
            height: number;
            license: string;
            downloadUrl: string;
        }>;
        totalFound: number;
        searchTime: string;
        filters: {
            count: number;
            orientation?: string;
            license: string;
        };
    };
    input?: {
        query: string;
    };
}>;
declare const ImageGalleryError: react__default.FC<{
    error: string;
    input?: {
        query: string;
    };
}>;

declare const analyzeSentimentTool: ai.Tool<{
    text: string;
    language?: string | undefined;
    detailed?: boolean | undefined;
}, {
    text: string;
    language: string;
    sentiment: string;
    confidence: number;
    score: number;
    wordCount: number;
    characterCount: number;
    analysisTime: string;
} | {
    breakdown: {
        positive: number;
        negative: number;
        neutral: number;
    };
    emotions: {
        emotion: string;
        intensity: number;
    }[];
    suggestions: string[];
    text: string;
    language: string;
    sentiment: string;
    confidence: number;
    score: number;
    wordCount: number;
    characterCount: number;
    analysisTime: string;
}>;

declare const SentimentAnalyzerLoading: react__default.FC<{
    input?: {
        text: string;
    };
}>;
declare const SentimentAnalyzer: react__default.FC<{
    output: {
        text: string;
        language: string;
        sentiment: 'positive' | 'negative' | 'neutral';
        confidence: number;
        score: number;
        wordCount: number;
        characterCount: number;
        analysisTime: string;
        breakdown: {
            positive: number;
            negative: number;
            neutral: number;
        };
        emotions: Array<{
            emotion: string;
            intensity: number;
        }>;
        suggestions: string[];
    };
    input?: {
        text: string;
    };
}>;
declare const SentimentAnalyzerError: react__default.FC<{
    error: string;
    input?: {
        text: string;
    };
}>;

declare const errorTool: ai.Tool<{
    errorType: "throw" | "return-error" | "success";
    message?: string | undefined;
}, {
    error: string;
    timestamp: string;
    success?: undefined;
    message?: undefined;
} | {
    success: boolean;
    message: string;
    timestamp: string;
    error?: undefined;
}>;

declare const ErrorTestLoading: react__default.FC<{
    input?: {
        errorType?: string;
        message?: string;
    };
}>;
declare const ErrorTestSuccess: react__default.FC<{
    output: {
        success: boolean;
        message: string;
        timestamp: string;
    };
    input?: {
        errorType?: string;
        message?: string;
    };
}>;
declare const ErrorTestError: react__default.FC<{
    error: string;
    input?: {
        errorType?: string;
        message?: string;
    };
}>;

declare const errorTestExample: {
    toolId: string;
    tool: ai.Tool<{
        errorType: "throw" | "return-error" | "success";
        message?: string | undefined;
    }, {
        error: string;
        timestamp: string;
        success?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        timestamp: string;
        error?: undefined;
    }>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                errorType?: string;
                message?: string;
            };
        }>;
        SuccessComponent: react.FC<{
            output: {
                success: boolean;
                message: string;
                timestamp: string;
            };
            input?: {
                errorType?: string;
                message?: string;
            };
        }>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                errorType?: string;
                message?: string;
            };
        }>;
    };
};

declare const productCardExample: {
    toolId: string;
    tool: ai.Tool<{
        name: string;
    }, {
        product: {
            id: string;
            name: string;
            price: number;
            currency: string;
            category: string;
            brand: string;
            rating: number;
            reviews: number;
            inStock: boolean;
            description: string;
            features: string[];
            images: string[];
        } | {
            id: string;
            name: string;
            price: number;
            currency: string;
            category: string;
            brand: string;
            rating: number;
            reviews: number;
            inStock: boolean;
            description: string;
            features: string[];
            images: string[];
        } | {
            id: string;
            name: string;
            price: number;
            currency: string;
            category: string;
            brand: string;
            rating: number;
            reviews: number;
            inStock: boolean;
            description: string;
            features: string[];
            images: string[];
        };
        timestamp: string;
        source: string;
    }>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                productId: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
        SuccessComponent: react.FC<ProductCardProps>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                productId: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
    };
};
declare const imageGalleryExample: {
    toolId: string;
    tool: ai.Tool<{
        query: string;
        count?: number | undefined;
        orientation?: "landscape" | "portrait" | "square" | undefined;
        license?: "free" | "commercial" | "any" | undefined;
    }, any>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                query: string;
            };
        }>;
        SuccessComponent: react.FC<{
            output: {
                query: string;
                results: Array<{
                    id: string;
                    url: string;
                    alt: string;
                    title: string;
                    photographer: string;
                    tags: string[];
                    width: number;
                    height: number;
                    license: string;
                    downloadUrl: string;
                }>;
                totalFound: number;
                searchTime: string;
                filters: {
                    count: number;
                    orientation?: string;
                    license: string;
                };
            };
            input?: {
                query: string;
            };
        }>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                query: string;
            };
        }>;
    };
};
declare const sentimentAnalyzerExample: {
    toolId: string;
    tool: ai.Tool<{
        text: string;
        language?: string | undefined;
        detailed?: boolean | undefined;
    }, {
        text: string;
        language: string;
        sentiment: string;
        confidence: number;
        score: number;
        wordCount: number;
        characterCount: number;
        analysisTime: string;
    } | {
        breakdown: {
            positive: number;
            negative: number;
            neutral: number;
        };
        emotions: {
            emotion: string;
            intensity: number;
        }[];
        suggestions: string[];
        text: string;
        language: string;
        sentiment: string;
        confidence: number;
        score: number;
        wordCount: number;
        characterCount: number;
        analysisTime: string;
    }>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                text: string;
            };
        }>;
        SuccessComponent: react.FC<{
            output: {
                text: string;
                language: string;
                sentiment: "positive" | "negative" | "neutral";
                confidence: number;
                score: number;
                wordCount: number;
                characterCount: number;
                analysisTime: string;
                breakdown: {
                    positive: number;
                    negative: number;
                    neutral: number;
                };
                emotions: Array<{
                    emotion: string;
                    intensity: number;
                }>;
                suggestions: string[];
            };
            input?: {
                text: string;
            };
        }>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                text: string;
            };
        }>;
    };
};
declare const examples: ({
    toolId: string;
    tool: ai.Tool<{
        name: string;
    }, {
        product: {
            id: string;
            name: string;
            price: number;
            currency: string;
            category: string;
            brand: string;
            rating: number;
            reviews: number;
            inStock: boolean;
            description: string;
            features: string[];
            images: string[];
        } | {
            id: string;
            name: string;
            price: number;
            currency: string;
            category: string;
            brand: string;
            rating: number;
            reviews: number;
            inStock: boolean;
            description: string;
            features: string[];
            images: string[];
        } | {
            id: string;
            name: string;
            price: number;
            currency: string;
            category: string;
            brand: string;
            rating: number;
            reviews: number;
            inStock: boolean;
            description: string;
            features: string[];
            images: string[];
        };
        timestamp: string;
        source: string;
    }>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                productId: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
        SuccessComponent: react.FC<ProductCardProps>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                productId: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
    };
} | {
    toolId: string;
    tool: ai.Tool<{
        query: string;
        count?: number | undefined;
        orientation?: "landscape" | "portrait" | "square" | undefined;
        license?: "free" | "commercial" | "any" | undefined;
    }, any>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                query: string;
            };
        }>;
        SuccessComponent: react.FC<{
            output: {
                query: string;
                results: Array<{
                    id: string;
                    url: string;
                    alt: string;
                    title: string;
                    photographer: string;
                    tags: string[];
                    width: number;
                    height: number;
                    license: string;
                    downloadUrl: string;
                }>;
                totalFound: number;
                searchTime: string;
                filters: {
                    count: number;
                    orientation?: string;
                    license: string;
                };
            };
            input?: {
                query: string;
            };
        }>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                query: string;
            };
        }>;
    };
} | {
    toolId: string;
    tool: ai.Tool<{
        text: string;
        language?: string | undefined;
        detailed?: boolean | undefined;
    }, {
        text: string;
        language: string;
        sentiment: string;
        confidence: number;
        score: number;
        wordCount: number;
        characterCount: number;
        analysisTime: string;
    } | {
        breakdown: {
            positive: number;
            negative: number;
            neutral: number;
        };
        emotions: {
            emotion: string;
            intensity: number;
        }[];
        suggestions: string[];
        text: string;
        language: string;
        sentiment: string;
        confidence: number;
        score: number;
        wordCount: number;
        characterCount: number;
        analysisTime: string;
    }>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                text: string;
            };
        }>;
        SuccessComponent: react.FC<{
            output: {
                text: string;
                language: string;
                sentiment: "positive" | "negative" | "neutral";
                confidence: number;
                score: number;
                wordCount: number;
                characterCount: number;
                analysisTime: string;
                breakdown: {
                    positive: number;
                    negative: number;
                    neutral: number;
                };
                emotions: Array<{
                    emotion: string;
                    intensity: number;
                }>;
                suggestions: string[];
            };
            input?: {
                text: string;
            };
        }>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                text: string;
            };
        }>;
    };
} | {
    toolId: string;
    tool: ai.Tool<{
        startDate?: string | undefined;
        endDate?: string | undefined;
        filters?: {
            status?: "pending" | "confirmed" | "cancelled" | undefined;
            search?: string | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | undefined;
        } | undefined;
    }, GetEventsOutput>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                date?: string;
                userId?: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
        SuccessComponent: react.FC<CalendarProps>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                date?: string;
                userId?: string;
            };
            onAction?: (action: {
                action: string;
                data?: any;
                context?: any;
            }) => void;
        }>;
    };
} | {
    toolId: string;
    tool: ai.Tool<{
        errorType: "throw" | "return-error" | "success";
        message?: string | undefined;
    }, {
        error: string;
        timestamp: string;
        success?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        timestamp: string;
        error?: undefined;
    }>;
    components: {
        LoadingComponent: react.FC<{
            input?: {
                errorType?: string;
                message?: string;
            };
        }>;
        SuccessComponent: react.FC<{
            output: {
                success: boolean;
                message: string;
                timestamp: string;
            };
            input?: {
                errorType?: string;
                message?: string;
            };
        }>;
        ErrorComponent: react.FC<{
            error: string;
            input?: {
                errorType?: string;
                message?: string;
            };
        }>;
    };
})[];

export { CalendarComponent, CalendarError, CalendarLoading, ErrorTestError, ErrorTestLoading, ErrorTestSuccess, ImageGallery, ImageGalleryError, ImageGalleryLoading, ProductCard, ProductCardError, ProductCardLoading, type ProductCardProps, type ProductInfo, SentimentAnalyzer, SentimentAnalyzerError, SentimentAnalyzerLoading, analyzeSentimentTool, calendarEventsExample, calendarTools, createEvent, deleteEvent, errorTestExample, errorTool, examples, getEvents, getProductInfo, imageGalleryExample, productCardExample, searchImages, sentimentAnalyzerExample, updateEvent };
