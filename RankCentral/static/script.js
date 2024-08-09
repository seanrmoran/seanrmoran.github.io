// script.js

// Function to initialize the sortable list (used in submit.html)
function initializeSortable() {
    $(".sortable").sortable({
        connectWith: ".sortable", // Allows items to be sorted between lists
        placeholder: "ui-state-highlight", // Highlights the space during sorting
        update: function(event, ui) {
            updateRanks(); // Call a new function to update ranks across all tiers
        }
    })
     .disableSelection(); 
}

// New function to update ranks globally across all tiers
function updateRanks() {
    var globalRank = 1; // Start the global rank at 1
    // Iterate over each tier's song-list
    $("#tierContainer .tier .sortable").each(function() {
        // Now iterate over each song item within a tier
        $(this).children().each(function() {
            // Assign the global rank to each song item and increment the global rank
            $(this).find(".song-rank").text(globalRank++);
            var tier = $(this).closest('.tier').data('tier');
            // Update the tier value for each song
            $(this).find("[name='song_tier[]']").val(tier);
        });
    });
}




// Function to toggle the visibility of the description text area
function toggleDescriptionVisibility() {
    // Event delegation for dynamically created elements
    $(document).on('click', '.desc-toggle', function() {
        $(this).closest('.song-item').find('.description-wrapper').slideToggle();
    });
}

// Static test data function for debugging
function testHandleSongRankingFormSubmission() {
    var testSongData = [{
        songId: "1", // Make sure this ID exists in your Songs table
        rank: "1",
        tier: "S",
        description: "Test description"
    }];

    // Simulate form submission with test data
    console.log("Submitting test song data:", JSON.stringify({songs: testSongData}));
    $.ajax({
        url: '/submit',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({songs: testSongData}),
        success: function(response) {
            console.log("Test submission successful, server response:", response);
            alert("Test submission successful!");
        },
        error: function(xhr, status, error) {
            console.error("Test submission failed:", status, error);
            alert("Test submission failed. Please check the console for errors.");
        }
    });
}

// Call this test function when you're ready to test the static submission
// For example, you can call it when a particular button is clicked
$('#testSubmitBtn').click(function() {
    testHandleSongRankingFormSubmission();
});

// Updated handleSongRankingFormSubmission to include tier data
function handleSongRankingFormSubmission() {
    $("#songRankingForm").submit(function(event) {
        event.preventDefault();

        var category_id = $('#category').val();
        var band_id = $('#band').val();
        var album_id = $('#album').val();

        // Collect song data including tier
        var songData = [];

        $("#tierContainer .tier").each(function() {
            var tier = $(this).data('tier');
            $(this).find(".song-item").each(function() {
                var songId = $(this).data('song-id');  // Using .data() for consistency
                console.log("Song ID:", songId); // Log the song ID
                var rank = $(this).find(".song-rank").text();
                var description = $(this).find(".description").val();
                // Add additional validations as needed
                if (songId && rank) {  // Ensuring songId and rank are present
                    songData.push({ songId, rank, tier, description });
                }
            });
        });

        var submissionData = {
            user: 'username', // You need to collect this from the form if necessary
            category_id: category_id,
            band_id: band_id,
            album_id: album_id,
            songs: songData
        };

        // AJAX request to submit song data
        console.log("Submitting song data:", JSON.stringify(submissionData));
        $.ajax({
            url: '/submit',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(submissionData),
            success: function(response) {
                console.log(response);
                alert("Submission successful!");
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error("Submission error:", status, error);
                alert("Submission failed. Please check the console for errors.");
            }
        });
    });
}

// Function to reset rankings to the original state
function resetRankings() {
    var selectedAlbum = $("#album").val();
    if (selectedAlbum) {
        fetchSongsForAlbum(selectedAlbum);
    }
}



function fetchSongsForAlbum(albumId) {
    $.ajax({
        url: '/songs/' + albumId,
        type: 'GET',
        success: function(response) {
            console.log("Songs fetched from the server:", response.songs);  // This should log the array of songs with song_id
            // Clear existing songs from all tiers, including 'No Tier'
            $("#tierContainer .sortable").empty();

            // Add new songs to the 'No Tier' list
            response.songs.forEach(function(song, index) {
                console.log(song);  // This will log each song object to the console
                var clone = $("#songItemTemplate").html();
                var $clone = $(clone);
                $clone.find(".song-item")
                    .attr("data-track-number", song.track_number)
                    .attr("data-song-id", song.song_id); // Add song_id attribute
                $clone.find(".song-name").text(song.name);
                $clone.find(".track-number").text("Track: " + song.track_number);
                $clone.find(".song-rank").text(index + 1);
                $("#resetRanking").removeClass('hidden');

                // Append clone to the 'No Tier'
                $("#tierContainer .tier[data-tier='No Tier'] .sortable").append($clone);
            });

            // Re-initialize sortable after adding songs
            initializeSortable();

            console.log("Newly added song items:", $("#tierContainer .tier[data-tier='No Tier'] .sortable .song-item"));

        },
        error: function(error) {
            console.log(error);
        }
    });
}


// Call this function when the album selection changes
$("#album").change(function() {
    var selectedAlbum = $(this).val();
    fetchSongsForAlbum(selectedAlbum);
});

// Initialize the script
$(document).ready(function() {

    // Bind the click event of the test button to the test function
    $('#testSubmitBtn').on('click', function() {
        testHandleSongRankingFormSubmission();
    });

    // Event handler for the reset button
    $("#resetRanking").click(function() {
    resetRankings();
    });

    // Fetch and populate categories on page load
    $.ajax({
        url: '/get_categories',
        type: 'GET',
        success: function(categories) {
            categories.forEach(function(category) {
                $('#category').append(new Option(category.name, category.id));
            });
        }
    });

    // Category selection change
    $("#category").change(function() {
        var selectedCategory = $(this).val();
        $('#band').empty().append(new Option('Select a Band', ''));
        if (selectedCategory) {
            // Fetch and populate bands
            $.ajax({
                url: '/get_bands/' + selectedCategory,
                type: 'GET',
                success: function(bands) {
                    bands.forEach(function(band) {
                        $('#band').append(new Option(band.name, band.id));
                    });
                    $("#bandLabel, #band").removeClass('hidden');
                }
            });
        } else {
            $("#bandLabel, #band, #albumLabel, #album").addClass('hidden');
        }
    });

    // Band selection change
    $("#band").change(function() {
        var selectedBand = $(this).val();
        $('#album').empty().append(new Option('Select an Album', ''));
        if (selectedBand) {
            // Fetch and populate albums
            $.ajax({
                url: '/get_albums/' + selectedBand,
                type: 'GET',
                success: function(albums) {
                    albums.forEach(function(album) {
                        $('#album').append(new Option(album.name, album.id));
                    });
                    $("#albumLabel, #album").removeClass('hidden');
                }
            });
        } else {
            $("#albumLabel, #album").addClass('hidden');
        }
    });

    // Album selection change
    $("#album").change(function() {
        var selectedAlbum = $(this).val();
        if (selectedAlbum) {
            fetchSongsForAlbum(selectedAlbum);
            $("#songListHeader, #tierContainer, #submitBtn").removeClass('hidden');
        } else {
            $("#songListHeader, #tierContainer, #submitBtn").addClass('hidden');
                        $("#resetRanking").addClass('hidden'); // Hide reset button if no album is selected

        }
    });

    if (window.location.pathname.includes('submit')) {
        initializeSortable();
        handleSongRankingFormSubmission();
        toggleDescriptionVisibility();
    }
});